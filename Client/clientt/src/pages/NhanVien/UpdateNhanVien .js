// UpdateNhanVien.js
import React, { useState } from "react";
import axios from "axios";

const UpdateNhanVien = () => {
  const [formData, setFormData] = useState({
    nhanvienid: "",
    firstnamenv: "",
    lastnamenv: "",
    chucvu: "",
    diachi: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:3000/nhanvien", formData)
      .then((response) => {
        alert("Cập nhật nhân viên thành công!");
        console.log(response.data);
      })
      .catch((error) => {
        alert("Cập nhật nhân viên thất bại!");
        console.error(error);
      });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Cập Nhật Nhân Viên</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>ID Nhân Viên</label>
          <input
            type="number"
            className="form-control"
            name="nhanvienid"
            value={formData.nhanvienid}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Họ Nhân Viên</label>
          <input
            type="text"
            className="form-control"
            name="firstnamenv"
            value={formData.firstnamenv}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Tên Nhân Viên</label>
          <input
            type="text"
            className="form-control"
            name="lastnamenv"
            value={formData.lastnamenv}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Chức Vụ</label>
          <input
            type="text"
            className="form-control"
            name="chucvu"
            value={formData.chucvu}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Địa Chỉ</label>
          <input
            type="text"
            className="form-control"
            name="diachi"
            value={formData.diachi}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Cập Nhật
        </button>
      </form>
    </div>
  );
};

export default UpdateNhanVien;
