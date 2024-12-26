import React, { useState, useEffect, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import apiGetTokenClient from "../../middleWare/getTokenClient";
import BackButton from "../../components/backButton";
import { DataContext } from "../../Provider/dataProvider";

const ListBookings = () => {
  const { data } = useContext(DataContext); // Lấy thông tin từ context
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  // Memoize fetchBookings to prevent unnecessary re-renders
  const fetchBookings = useCallback(() => {
    apiGetTokenClient
      .get("http://localhost:3000/booking")
      .then((response) => {
        const allBookings = response.data.result || [];
        // Lọc dữ liệu dựa trên CustomerID
        if (data?.role === "1") {
          setBookings(allBookings); // Quản trị viên, hiển thị tất cả bookings
        } else {
          const filteredBookings = allBookings.filter(
            (booking) => booking.CustomerID === data?.id
          );
          setBookings(filteredBookings); // Người dùng, chỉ hiển thị bookings của chính họ
        }
      })
      .catch((error) => console.error("Error fetching bookings:", error));
  }, [data?.id, data?.role]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const handleDelete = (bookingId) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      apiGetTokenClient
        .delete(`http://localhost:3000/booking/${bookingId}`)
        .then(() => {
          alert("Booking deleted successfully!");
          fetchBookings(); // Refresh list after deletion
        })
        .catch((error) => console.error("Error deleting booking:", error));
    }
  };

  const handleUpdate = (booking) => {
    navigate("/capNhatDatPhong", { state: { booking } });
  };

  return (
    <div className="container mt-5">
      <BackButton />
      <h1 className="text-center">Danh Sách Đặt Phòng</h1>
      <table className="table table-striped table-bordered mt-4">
        <thead className="thead-dark">
          <tr>
            {data?.role === "1" && (
              <>
                <th>ID Đặt Phòng</th>
                <th>ID Khách Hàng</th>
              </>
            )}
            <th>ID Phòng</th>
            <th>Ngày Đặt</th>
            <th>Ngày Trả</th>
            <th>Tổng Tiền</th>
            <th>Chức Năng</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.BookingID}>
              {data?.role === "1" && (
                <>
                  <td>{booking.BookingID}</td>
                  <td>{booking.CustomerID}</td>
                </>
              )}
              <td>{booking.RoomID}</td>
              <td>{booking.CheckInDate}</td>
              <td>{booking.CheckOutDate}</td>
              <td>{booking.TotalPrice}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm mr-2"
                  onClick={() => handleUpdate(booking)}
                >
                  Cập Nhật
                </button>
                {data?.role === "1" && (
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(booking.BookingID)}
                  >
                    Xóa
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListBookings;
