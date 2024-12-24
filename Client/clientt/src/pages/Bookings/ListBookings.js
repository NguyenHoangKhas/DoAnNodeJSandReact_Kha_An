// ListBookings.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const ListBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = () => {
    axios
      .get("http://localhost:3000/booking")
      .then((response) => setBookings(response.data.result))
      .catch((error) => console.error("Error fetching bookings:", error));
  };

  const handleDelete = (bookingId) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      axios
        .delete(`http://localhost:3000/booking/${bookingId}`)
        .then(() => {
          alert("Booking deleted successfully!");
          fetchBookings(); // Refresh list after deletion
        })
        .catch((error) => console.error("Error deleting booking:", error));
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Booking List</h1>
      <table className="table table-striped table-bordered mt-4">
        <thead className="thead-dark">
          <tr>
            <th>Booking ID</th>
            <th>Customer ID</th>
            <th>Room ID</th>
            <th>Check-in Date</th>
            <th>Check-out Date</th>
            <th>Total Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.BookingID}>
              <td>{booking.BookingID}</td>
              <td>{booking.CustomerID}</td>
              <td>{booking.RoomID}</td>
              <td>{booking.CheckInDate}</td>
              <td>{booking.CheckOutDate}</td>
              <td>{booking.TotalPrice}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(booking.BookingID)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListBookings;
