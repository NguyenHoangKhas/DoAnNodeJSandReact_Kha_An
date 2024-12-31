import React, { useState, useEffect, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import apiGetTokenClient from "../../middleWare/getTokenClient";
import BackButton from "../../components/backButton";
import { DataContext } from "../../Provider/dataProvider";

const BASE_URL = "http://localhost:3000";

const ListBookings = () => {
  const { data } = useContext(DataContext);
  const [bookings, setBookings] = useState([]);
  const [modalData, setModalData] = useState({
    show: false,
    message: "",
    onConfirm: null,
  });
  const navigate = useNavigate();

  const fetchBookings = useCallback(() => {
    apiGetTokenClient
      .get(`${BASE_URL}/booking`)
      .then((response) => {
        const allBookings = response.data.result || [];
        setBookings(allBookings);
      })
      .catch((error) => console.error("Error fetching bookings:", error));
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const handleDelete = (bookingId) => {
    setModalData({
      show: true,
      message: "Are you sure you want to delete this booking?",
      onConfirm: () => deleteBooking(bookingId),
    });
  };

  const deleteBooking = (bookingId) => {
    apiGetTokenClient
      .delete(`${BASE_URL}/booking/${bookingId}`)
      .then(() => {
        setModalData({
          show: true,
          message: "Booking deleted successfully!",
          onConfirm: null,
        });
        fetchBookings();
      })
      .catch((error) => {
        console.error("Error deleting booking:", error);
        setModalData({
          show: true,
          message: "Error occurred while deleting the booking.",
          onConfirm: null,
        });
      });
  };

  const handleModalClose = () => {
    setModalData({ show: false, message: "", onConfirm: null });
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
              <>
                <td>{booking.BookingID}</td>
                <td>{booking.CustomerID}</td>
              </>
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
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(booking.BookingID)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalData.show && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Thông Báo</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleModalClose}
                ></button>
              </div>
              <div className="modal-body">
                <p>{modalData.message}</p>
              </div>
              <div className="modal-footer">
                {modalData.onConfirm ? (
                  <>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleModalClose}
                    >
                      Hủy
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => {
                        modalData.onConfirm();
                        handleModalClose();
                      }}
                    >
                      Xác Nhận
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleModalClose}
                  >
                    Đóng
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListBookings;
