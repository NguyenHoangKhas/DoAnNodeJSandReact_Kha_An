import React, { useState } from 'react';
import '../../css/NhanVienCreate.css';
import apiGetTokenClient from '../../middleWare/getTokenClient';
import BackButton from '../../components/backButton';
import { notification } from 'antd';

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
      notification.warning({
        message: 'Cảnh báo',
        description: 'Vui lòng điền đầy đủ thông tin!',
        placement: 'topRight',
      });
      return;
    }

    // Gửi dữ liệu lên server qua API POST
    apiGetTokenClient
      .post('http://localhost:3000/nhanvien', nhanVien)
      .then((response) => {
        if (response.data.error) {
          notification.error({
            message: 'Lỗi',
            description: `Lỗi: ${response.data.error}`,
            placement: 'topRight',
          });
        } else {
          notification.success({
            message: 'Thành công',
            description: 'Thêm nhân viên thành công!',
            placement: 'topRight',
          });
          setNhanVien({ firstnamenv: '', lastnamenv: '', chucvu: '', diachi: '' });
        }
      })
      .catch((error) => {
        console.error('Error adding new employee:', error);
        notification.error({
          message: 'Lỗi',
          description: 'Có lỗi xảy ra khi thêm nhân viên.',
          placement: 'topRight',
        });
      });
  };

  return (
    <div className="nhanvien-create-container">
      <BackButton />
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
