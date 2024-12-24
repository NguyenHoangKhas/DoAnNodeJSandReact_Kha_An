import React, { useEffect, useState } from "react";
import axios from "axios";

const RoomList2 = () => {
  const [rooms, setRooms] = useState([]);

  // Fetch list of rooms
  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await axios.get("http://localhost:3000/room");
      setRooms(response.data.result);
    } catch (err) {
      console.error("Error fetching rooms:", err);
    }
  };

  // Delete a room
  const handleDeleteRoom = async (roomId) => {
    try {
      await axios.delete(`http://localhost:3000/room/${roomId}`);
      fetchRooms(); // Refresh the list after deletion
    } catch (err) {
      console.error("Error deleting room:", err);
    }
  };
  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Room List</h1>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Room Number</th>
              <th>Room Type</th>
              <th>Price Per Night</th>
              <th>Availability</th>
              <th>Room Type ID</th>
              <th>Image URL</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room.RoomID}>
                <td>{room.RoomID}</td>
                <td>{room.RoomNumber}</td>
                <td>{room.RoomType}</td>
                <td>{room.PricePerNight}</td>
                <td>{room.Availability ? "Yes" : "No"}</td>
                <td>{room.LoaiPhongID}</td>
                <td>
                  <a href={room.ImageUrl} target="_blank" rel="noopener noreferrer">
                    View Image
                  </a>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDeleteRoom(room.RoomID)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RoomList2;
