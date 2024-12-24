// AddBooking.js
import React, { useState } from "react";
import axios from "axios";

const AddBooking = () => {
  const [formData, setFormData] = useState({
    customerid: "",
    roomid: "",
    checkindate: "",
    checkoutdate: "",
    totalprice: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/booking", formData)
      .then(() => {
        alert("Booking added successfully!");
        setFormData({
          customerid: "",
          roomid: "",
          checkindate: "",
          checkoutdate: "",
          totalprice: "",
        });
      })
      .catch((error) => console.error("Error adding booking:", error));
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Add Booking</h1>
      <form className="mt-4" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Customer ID</label>
          <input
            type="number"
            className="form-control"
            name="customerid"
            value={formData.customerid}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Room ID</label>
          <input
            type="number"
            className="form-control"
            name="roomid"
            value={formData.roomid}
            onChange={handleChange}
            required
          />
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
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          Add Booking
        </button>
      </form>
    </div>
  );
};

export default AddBooking;
