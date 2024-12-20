import React, { useState, useEffect } from 'react';
import apiGetTokenClient from '../../middleWare/getTokenClient';
import { Link } from 'react-router-dom';
import '../../css/NhanVienList.css';

function NhanVienList() {
  const [nhanViens, setNhanViens] = useState([]);
  const [loading, setLoading] = useState(true);

  // Lấy danh sách nhân viên từ API
  useEffect(() => {
    apiGetTokenClient
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
      apiGetTokenClient
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
    return <div className="text-center mt-4">Đang tải dữ liệu...</div>;
  }

  return (
    <div className="container containerCustom mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Danh Sách Nhân Viên</h2>
        <Link to="/addNhanVien" className="btn btn-primary">
          Thêm Nhân Viên
        </Link>
      </div>
      <div className="table tableCustom"> {/* Thêm class để làm cho bảng phản hồi */}
        <table className="table table-striped table-bordered"> {/* Thêm border cho bảng */}
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
                    className="btn btn-danger btn-sm"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default NhanVienList;
