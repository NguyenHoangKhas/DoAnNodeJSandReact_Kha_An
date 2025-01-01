import React, { useState } from "react";
import { notification } from 'antd';
import apiGetTokenClient from '../../middleWare/getTokenClient';
import { useLocation, useNavigate } from "react-router-dom";
import BackButton from '../../components/backButton';

const UpdateRoom = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { room } = state || {}; // Room data passed from RoomList2

  const [formData, setFormData] = useState({
    roomid: room?.RoomID || "",
    roomnumber: room?.RoomNumber || "",
    roomtype: room?.RoomType || "",
    pricepernight: room?.PricePerNight || "",
    availability: room?.Availability || false,
    loaiphongid: room?.LoaiPhongID || "",
    imageurl: room?.ImageUrl || "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    apiGetTokenClient
      .put(`http://localhost:3000/room/`, formData)
      .then((response) => {
        notification.success({
          message: 'Thành công',
          description: 'Cập nhật thông tin phòng thành công!',
          placement: 'topRight',
        });
        console.log(response.data);
        navigate("/suaPhong");
      })
      .catch((error) => {
        notification.error({
          message: 'Thất bại',
          description: 'Cập nhật thông tin phòng thất bại!',
          placement: 'topRight',
        });
        console.error(error);
      });
  };

  return (
    <div className="container mt-5">
      <BackButton />
      <h2 className="text-center">Cập Nhật Thông Tin Phòng</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>ID Phòng</label>
          <input
            type="number"
            className="form-control"
            name="roomid"
            value={formData.roomid}
            onChange={handleChange}
            disabled
          />
        </div>
        <div className="form-group">
          <label>Số Phòng</label>
          <input
            type="text"
            className="form-control"
            name="roomnumber"
            value={formData.roomnumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Loại Phòng</label>
          <input
            type="text"
            className="form-control"
            name="roomtype"
            value={formData.roomtype}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Giá Mỗi Đêm</label>
          <input
            type="number"
            className="form-control"
            name="pricepernight"
            value={formData.pricepernight}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Tình Trạng (Còn trống)</label>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              name="availability"
              checked={formData.availability}
              onChange={handleChange}
            />
            <label className="form-check-label">Còn trống</label>
          </div>
        </div>
        <div className="form-group">
          <label>ID Loại Phòng</label>
          <input
            type="number"
            className="form-control"
            name="loaiphongid"
            value={formData.loaiphongid}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Đường Dẫn Ảnh</label>
          <input
            type="text"
            className="form-control"
            name="imageurl"
            value={formData.imageurl}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Cập Nhật
        </button>
      </form>
    </div>
  );
};

export default UpdateRoom;
