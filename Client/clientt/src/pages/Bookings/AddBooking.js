import React, { useState, useContext } from "react";
import apiGetTokenClient from '../../middleWare/getTokenClient';
import { useNavigate, useLocation } from 'react-router-dom';
import { DataContext } from '../../Provider/dataProvider';

const AddBooking = () => {
  const location = useLocation();
  const idPhong = location.state?.idPhong;
  const totalMoney = location.state?.totalMoney;
  const navigate = useNavigate();
  const { data } = useContext(DataContext);
  const [formData, setFormData] = useState({
    customerid: data?.id || "", // Assuming `userId` is available in `DataContext`
    roomid: idPhong,
    checkindate: "",
    checkoutdate: "",
    totalprice: totalMoney,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Date validation
    if (new Date(formData.checkindate) > new Date(formData.checkoutdate)) {
      setError("Ngày trả phải sau ngày đặt.");
      return;
    }

    setLoading(true);
    setError("");

    apiGetTokenClient
      .post("http://localhost:3000/booking", formData)
      .then(() => {
        alert("Booking added successfully!");
        console.log("BOOKING DATA: ", formData)
        setFormData({
          customerid: data?.userId || "",
          roomid: "",
          checkindate: "",
          checkoutdate: "",
          totalprice: "",
        });
        navigate("/listDatPhong");
      })
      .catch((err) => {
        console.error("Error adding booking:", err);
        setError("Không thể thêm đặt phòng. Vui lòng thử lại.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">
        Đặt Phòng
        {data?.role === "1" && (
          <>
            &nbsp;
            <button onClick={() => navigate("/listDatPhong")} className="btn btn-primary">
              <i className="bi bi-card-list"></i>
            </button>
            &nbsp;
            <button onClick={() => navigate("/capNhatDatPhong")} className="btn btn-primary">
              <i className="bi bi-pen"></i>
            </button>
          </>
        )}
      </h1>

      {error && <div className="alert alert-danger">{error}</div>}

      <form className="mt-4" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="roomid">ID Phòng: {formData.roomid}</label>
        </div>
        <div className="form-group">
          <label htmlFor="checkindate">Ngày Đặt</label>
          <input
            type="date"
            id="checkindate"
            className="form-control"
            name="checkindate"
            value={formData.checkindate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="checkoutdate">Ngày Trả</label>
          <input
            type="date"
            id="checkoutdate"
            className="form-control"
            name="checkoutdate"
            value={formData.checkoutdate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="totalprice">Tổng Giá</label>
          <input
            type="number"
            id="totalprice"
            className="form-control"
            name="totalprice"
            step="0.01"
            value={formData.totalprice}
            onChange={handleChange}
            required
            disabled
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
          {loading ? "Đang xử lý..." : "Đặt"}
        </button>
      </form>
    </div>
  );
};

export default AddBooking;
