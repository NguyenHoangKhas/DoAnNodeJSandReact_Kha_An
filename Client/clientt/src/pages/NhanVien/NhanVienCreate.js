import React, { useState } from 'react';
import axios from 'axios';
import '../../css/NhanVienCreate.css';

function NhanVienCreate() {
  const [nhanVien, setNhanVien] = useState({
    firstnamenv: '',
    lastnamenv: '',
    chucvu: '',
    diachi: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNhanVien({ ...nhanVien, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Kiểm tra các trường không được để trống
    if (!nhanVien.firstnamenv || !nhanVien.lastnamenv || !nhanVien.chucvu || !nhanVien.diachi) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    // Gửi dữ liệu lên server qua API POST
    axios
      .post('http://localhost:3000/nhanvien', nhanVien)
      .then((response) => {
        if (response.data.error) {
          alert(`Lỗi: ${response.data.error}`);
        } else {
          alert('Thêm nhân viên thành công!');
          setNhanVien({ firstnamenv: '', lastnamenv: '', chucvu: '', diachi: '' });
        }
      })
      .catch((error) => {
        console.error('Error adding new employee:', error);
        alert('Có lỗi xảy ra khi thêm nhân viên.');
      });
  };

  return (
    <div className="nhanvien-create-container">
      <h2>Thêm Nhân Viên</h2>
      <form onSubmit={handleSubmit} className="nhanvien-form">
        <div className="form-group">
          <label>Tên Nhân Viên:</label>
          <input
            type="text"
            name="firstnamenv"
            value={nhanVien.firstnamenv}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Họ Nhân Viên:</label>
          <input
            type="text"
            name="lastnamenv"
            value={nhanVien.lastnamenv}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Chức Vụ:</label>
          <input
            type="text"
            name="chucvu"
            value={nhanVien.chucvu}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Địa Chỉ:</label>
          <input
            type="text"
            name="diachi"
            value={nhanVien.diachi}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn-submit">
          Thêm Nhân Viên
        </button>
      </form>
    </div>
  );
}

export default NhanVienCreate;
