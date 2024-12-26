import React, { useState } from 'react';
import apiGetTokenClient from '../../middleWare/getTokenClient';
import '../../css/StudentList.css'; // Import file CSS
import BackButton from '../../components/backButton';

function DichVuCreate() {
  const [tenDV, setTenDV] = useState('');
  const [gia, setGia] = useState('');

  // Hàm xử lý gửi dữ liệu
  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn chặn hành động mặc định của form

    // Dữ liệu cần gửi
    const newService = {
      TenDV: tenDV,
      Gia: parseInt(gia), // Chuyển đổi giá thành số nguyên
    };

    try {
      await apiGetTokenClient.post('http://localhost:3000/student', newService);
      console.log('Dịch vụ đã được thêm:', newService);
      alert("Thêm dịch vụ thành công!");
      // Có thể thêm logic để reset form hoặc điều hướng
    } catch (error) {
      console.error('Có lỗi xảy ra khi thêm dịch vụ:', error);
      alert("Có lỗi xảy ra khi thêm dịch vụ.");
    }
  };

  return (
    <div className="create-service-container">
      <BackButton />
      <h1 className="create-service-title">Thêm Dịch Vụ</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="tenDV" className="form-label">Tên Dịch Vụ</label>
          <input
            type="text"
            className="form-control"
            id="tenDV"
            value={tenDV}
            onChange={(e) => setTenDV(e.target.value)}
            placeholder="Nhập tên dịch vụ"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="gia" className="form-label">Giá</label>
          <input
            type="number"
            className="form-control"
            id="gia"
            value={gia}
            onChange={(e) => setGia(e.target.value)}
            placeholder="Nhập giá dịch vụ"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Thêm Dịch Vụ</button>
      </form>
    </div>
  );
}

export default DichVuCreate;
