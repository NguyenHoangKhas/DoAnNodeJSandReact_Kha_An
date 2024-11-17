import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/NhanVienList.css';

function NhanVienList() {
  const [nhanViens, setNhanViens] = useState([]);
  const [loading, setLoading] = useState(true);

  // Lấy danh sách nhân viên từ API
  useEffect(() => {
    axios
      .get('http://localhost:3000/nhanvien')
      .then((response) => {
        if (response.data.error) {
          alert(`Lỗi: ${response.data.error}`);
        } else {
          setNhanViens(response.data.result);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching employees:', error);
        alert('Có lỗi khi lấy danh sách nhân viên.');
        setLoading(false);
      });
  }, []);

  // Xử lý xóa nhân viên
  const handleDelete = (nhanVienID) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa nhân viên này?')) {
      axios
        .delete(`http://localhost:3000/nhanvien/${nhanVienID}`)
        .then((response) => {
          if (response.data.error) {
            alert(`Lỗi: ${response.data.error}`);
          } else {
            setNhanViens(nhanViens.filter((nv) => nv.NhanVienID !== nhanVienID));
            alert('Xóa nhân viên thành công!');
          }
        })
        .catch((error) => {
          console.error('Error deleting employee:', error);
          alert('Có lỗi xảy ra khi xóa nhân viên.');
        });
    }
  };

  if (loading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  return (
    <div className="nhanvien-list-container">
      <h2>Danh Sách Nhân Viên</h2>
      <table className="nhanvien-table">
        <thead>
          <tr>
            <th>Tên Nhân Viên</th>
            <th>Chức Vụ</th>
            <th>Địa Chỉ</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {nhanViens.map((nhanVien) => (
            <tr key={nhanVien.NhanVienID}>
              <td>{`${nhanVien.FirstNameNV} ${nhanVien.LastNameNV}`}</td>
              <td>{nhanVien.ChucVu}</td>
              <td>{nhanVien.DiaChi}</td>
              <td>
                <button
                  onClick={() => handleDelete(nhanVien.NhanVienID)}
                  className="btn-delete"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default NhanVienList;
