import React, { useState, useEffect } from "react";
import apiGetTokenClient from '../../middleWare/getTokenClient';
import { useNavigate, useLocation } from 'react-router-dom';

const AddBooking = () => {
  const location = useLocation();
  const idPhong = location.state?.idPhong;
  const namePhong = location.state?.namePhong;
  const totalMoney = location.state?.totalMoney;
  const userid = location.state?.userid;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    customerid: "",
    // roomid là ID của Room nhưng tôi đổi lại
    roomid: idPhong,
    checkindate: "",
    checkoutdate: "",
    totalprice: totalMoney,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch CustomerID using UserID
  useEffect(() => {
    const fetchCustomerID = async () => {
      try {
        const response = await apiGetTokenClient.get("http://localhost:3000/customer");
        const customers = response.data.result || [];
        const customer = customers.find(cust => cust.UserID === userid);
        if (customer?.CustomerID) {
          setFormData((prev) => ({ ...prev, customerid: customer.CustomerID }));
        } else {
          setError("Không tìm thấy CustomerID cho UserID đã cung cấp.");
        }
      } catch (err) {
        console.error("Error fetching CustomerID:", err);
        setError("Không thể lấy thông tin khách hàng. Vui lòng thử lại.");
      }
    };

    if (userid) {
      fetchCustomerID();
    }
  }, [userid]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (new Date(formData.checkindate) > new Date(formData.checkoutdate)) {
      setError("Ngày trả phải sau ngày đặt.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Thêm booking
      await apiGetTokenClient.post("http://localhost:3000/booking", formData);

      // Lấy BookingID đầu tiên có CustomerID === formData.customerid
      const bookingResponse = await apiGetTokenClient.get("http://localhost:3000/booking");
      const bookings = bookingResponse.data.result || [];
      const booking = bookings.find(bk => bk.CustomerID === formData.customerid);
      console.log(">>>BOOKING: ", booking, ">>>BOOKINGS: ", bookings, "FORMDATA CUSTOMERID: ", formData.customerid)
      if (!booking?.BookingID) {
        throw new Error("Không tìm thấy BookingID phù hợp.");
      }

      const bookingId = booking.BookingID;

      // Lấy nhân viên đầu tiên từ table NhanVien
      const staffResponse = await apiGetTokenClient.get("http://localhost:3000/nhanvien");
      const staffList = staffResponse.data.result || [];
      const firstStaffId = staffList[0]?.NhanVienID;

      if (!firstStaffId) {
        throw new Error("Không tìm thấy nhân viên.");
      }

      // Tạo hóa đơn
      const hoaDonData = {
        TenHD: `Phòng ${namePhong}`,
        NgayTT: null,
        Ma_KH: formData.customerid,
        Ma_BOOKING: bookingId,
        ThanhTien: totalMoney,
        TrangThai: false,
        NhanVienID: firstStaffId,
      };

      await apiGetTokenClient.post("http://localhost:3000/hoaDon", hoaDonData);

      alert("Đặt phòng và hóa đơn đã được tạo thành công!");
      navigate("/hoaDonList");
    } catch (err) {
      console.error("Error processing booking and invoice:", err);
      setError("Không thể xử lý yêu cầu. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="container mt-5">
      <h1 className="text-center">Đặt Phòng</h1>
      {error && <div className="alert alert-danger">{error}</div>}

      <form className="mt-4" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="roomid">ID Phòng: {formData.roomid}</label>
        </div>
        <div className="form-group">
          <label htmlFor="roomNumber">Số Phòng: {namePhong}</label>
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
