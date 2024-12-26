import React, { useState, useEffect } from 'react';
import apiGetTokenClient from '../../middleWare/getTokenClient';
import { useNavigate } from 'react-router-dom';
import '../../css/NhanVienList.css';

function NhanVienList() {
  const navigate = useNavigate();
  const [nhanViens, setNhanViens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [employeeToDelete, setEmployeeToDelete] = useState(null); // State for the employee to delete

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
  };

  const confirmDelete = () => {
    if (employeeToDelete) {
      console.log(">>>EMPLOY: ", employeeToDelete.NhanVienID)
      handleDelete(employeeToDelete.NhanVienID);
      setEmployeeToDelete(null); // Reset the employee to delete
    }
    closeModal();
  };

  const openModal = (nhanVien) => {
    setEmployeeToDelete(nhanVien); // Set the employee to delete
    window.$('#deleteModal').modal('show'); // Show modal
  };

  const closeModal = () => {
    setEmployeeToDelete(null);
    window.$('#deleteModal').modal('hide'); // Hide modal
  };

  if (loading) {
    return <div className="text-center mt-4">Đang tải dữ liệu...</div>;
  }

  return (
    <div className="container containerCustom mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Danh Sách Nhân Viên</h2>
        <button onClick={() => navigate("/addNhanVien")} className="btn btn-primary">Thêm Nhân Viên</button>
      </div>
      <div className="table tableCustom">
        <table className="table table-striped table-bordered">
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
                    onClick={() => openModal(nhanVien)} // Open modal instead of delete directly
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

      {/* Modal xác nhận xóa */}
      <div className="modal fade" id="deleteModal" tabIndex="-1" role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteModalLabel">Xác Nhận Xóa</h5>
              <button type="button" className="close" onClick={closeModal} aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              Bạn có chắc chắn muốn xóa nhân viên <strong>{employeeToDelete ? `${employeeToDelete.FirstNameNV} ${employeeToDelete.LastNameNV}` : ''}</strong> không?
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={closeModal}>Hủy</button>
              <button type="button" className="btn btn-danger" onClick={confirmDelete}>
                Xóa
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NhanVienList;
