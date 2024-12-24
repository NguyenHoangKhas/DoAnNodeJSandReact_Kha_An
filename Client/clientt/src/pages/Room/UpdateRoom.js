// UpdateRoom.js
import React, { useState } from "react";
import axios from "axios";

const UpdateRoom = () => {
  const [formData, setFormData] = useState({
    roomid: "",
    roomnumber: "",
    roomtype: "",
    pricepernight: "",
    availability: false,
    loaiphongid: "",
    imageurl: "",
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
    axios
      .put("http://localhost:3000/room", formData)
      .then((response) => {
        alert("Cập nhật thông tin phòng thành công!");
        console.log(response.data);
      })
      .catch((error) => {
        alert("Cập nhật thông tin phòng thất bại!");
        console.error(error);
      });
  };

  return (
    <div className="container mt-5">
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
            required
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
