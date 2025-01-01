// UpdateBooking.js
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import apiGetTokenClient from '../../middleWare/getTokenClient';
import BackButton from '../../components/backButton';
import { notification } from "antd";

const UpdateBooking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const booking = location.state?.booking;

  const initialFormData = {
    bookingid: booking.BookingID,
    customerid: booking.CustomerID,
    roomid: booking.RoomID,
    checkindate: "",
    checkoutdate: "",
    totalprice: booking.TotalPrice,
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    apiGetTokenClient
      .put("http://localhost:3000/booking", formData)
      .then(() => {
        notification.success({
          message: "success",
          description: "Cập nhật đặt phòng thành công!",
          placement: "topRight",
        });
        navigate('/listDatPhong');
      }
      )
      .catch((error) => console.error("Error updating booking:", error));
  };

  return (
    <div className="container mt-5">
      <BackButton />
      <h1 className="text-center">Cập Nhật Đặt Phòng</h1>
      <form className="mt-4" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Sửa Phòng {formData.roomid}</label>
        </div>
        <div className="form-group">
          <label>Ngày nhận phòng</label>
          <input
            type="date"
            className="form-control"
            name="checkindate"
            value={formData.checkindate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Ngày trả phòng</label>
          <input
            type="date"
            className="form-control"
            name="checkoutdate"
            value={formData.checkoutdate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Tổng giá</label>
          <input
            type="number"
            className="form-control"
            name="totalprice"
            step="0.01"
            value={formData.totalprice}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-warning btn-block">
          Cập Nhật
        </button>
      </form>
    </div>
  );
};

export default UpdateBooking;
