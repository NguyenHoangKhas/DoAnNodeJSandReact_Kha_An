// UpdateHoaDon.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UpdateHoaDon = () => {
  const { mahd } = useParams(); // Lấy MaHD từ URL params
  const navigate = useNavigate(); // Dùng để chuyển hướng sau khi cập nhật

  const [formData, setFormData] = useState({
    tenhd: "",
    ma_kh: "",
    ma_book: "",
    ngaytt: "",
    thanhtien: "",
    nhanvienid: "",
    trangthai: "",
  });

  useEffect(() => {
    // Lấy dữ liệu hóa đơn hiện tại để điền vào form
    axios
      .get(`http://localhost:3000/hoadon/${mahd}`)
      .then((response) => {
        if (response.data.result) {
          setFormData(response.data.result);
        }
      })
      .catch((error) => console.error("Error fetching invoice details:", error));
  }, [mahd]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:3000/hoadon", { ...formData, mahd })
      .then((response) => {
        alert("Cập nhật hóa đơn thành công!");
        navigate("/hoadon"); // Chuyển hướng về danh sách hóa đơn
      })
      .catch((error) => {
        console.error("Error updating invoice:", error);
        alert("Cập nhật hóa đơn thất bại. Vui lòng thử lại!");
      });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Cập Nhật Hóa Đơn</h1>
      <form className="mt-4" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="tenhd">Tên Hóa Đơn</label>
          <input
            type="text"
            className="form-control"
            id="tenhd"
            name="tenhd"
            value={formData.tenhd}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="ma_kh">Mã Khách Hàng</label>
          <input
            type="number"
            className="form-control"
            id="ma_kh"
            name="ma_kh"
            value={formData.ma_kh}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="ma_book">Mã Booking</label>
          <input
            type="number"
            className="form-control"
            id="ma_book"
            name="ma_book"
            value={formData.ma_book}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="ngaytt">Ngày Thanh Toán</label>
          <input
            type="date"
            className="form-control"
            id="ngaytt"
            name="ngaytt"
            value={formData.ngaytt}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="thanhtien">Thành Tiền</label>
          <input
            type="number"
            className="form-control"
            id="thanhtien"
            name="thanhtien"
            value={formData.thanhtien}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="nhanvienid">Nhân Viên ID</label>
          <input
            type="number"
            className="form-control"
            id="nhanvienid"
            name="nhanvienid"
            value={formData.nhanvienid}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="trangthai">Trạng Thái</label>
          <select
            className="form-control"
            id="trangthai"
            name="trangthai"
            value={formData.trangthai}
            onChange={handleChange}
          >
            <option value="Chưa thanh toán">Chưa thanh toán</option>
            <option value="Đã thanh toán">Đã thanh toán</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Cập Nhật
        </button>
        <button
          type="button"
          className="btn btn-secondary mt-3 ml-3"
          onClick={() => navigate("/hoadon")}
        >
          Hủy
        </button>
      </form>
    </div>
  );
};

export default UpdateHoaDon;
