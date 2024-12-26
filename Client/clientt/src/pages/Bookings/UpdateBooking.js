// UpdateBooking.js
import React, { useState, useContext } from "react";
import { useLocation } from "react-router-dom"; // For navigation
import apiGetTokenClient from '../../middleWare/getTokenClient';
import { DataContext } from "../../Provider/dataProvider";
import BackButton from '../../components/backButton';

const UpdateBooking = () => {
  const { data } = useContext(DataContext); // Lấy thông tin từ context
  const location = useLocation();
  const booking = location.state?.booking;

  const initialFormData = data?.role === "1" ? {
    bookingid: "",
    customerid: "",
    roomid: "",
    checkindate: "",
    checkoutdate: "",
    totalprice: "",
  } : {
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
      .then(() => alert("Booking updated successfully!"))
      .catch((error) => console.error("Error updating booking:", error));
  };

  return (
    <div className="container mt-5">
      <BackButton />
      <h1 className="text-center">Update Booking</h1>
      <form className="mt-4" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Sửa Phòng {formData.roomid}</label>
        </div>
        <div className="form-group">
          <label>Check-in Date</label>
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
          <label>Check-out Date</label>
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
          <label>Total Price</label>
          <input
            type="number"
            className="form-control"
            name="totalprice"
            step="0.01"
            value={formData.totalprice}
            onChange={handleChange}
            required
            disabled
          />
        </div>
        <button type="submit" className="btn btn-warning btn-block">
          Update Booking
        </button>
      </form>
    </div>
  );
};

export default UpdateBooking;
