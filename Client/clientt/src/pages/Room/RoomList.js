import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/RoomList.css';

const RoomList = () => {
  const [rooms, setRooms] = useState([]); // State lưu danh sách phòng
  const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu
  const [error, setError] = useState(null); // Trạng thái lỗi
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const roomsPerPage = 6; // Số phòng mỗi trang

  // Hàm gọi API để lấy danh sách phòng
  const fetchRooms = async () => {
    try {
      const response = await axios.get('http://localhost:3000/room'); // API lấy danh sách phòng
      setRooms(response.data.result); // Lưu dữ liệu vào state
      setLoading(false); // Đã tải xong
    } catch (err) {
      setError('Không thể tải danh sách phòng!');
      setLoading(false);
    }
  };

  // useEffect gọi API khi component được render lần đầu
  useEffect(() => {
    fetchRooms();
  }, []);

  // Xác định các phòng hiện tại dựa trên trang
  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = rooms.slice(indexOfFirstRoom, indexOfLastRoom);

  // Hàm chuyển trang
  const nextPage = () => {
    if (currentPage < Math.ceil(rooms.length / roomsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Hiển thị loading hoặc lỗi nếu có
  if (loading) return <p className="loading">Đang tải dữ liệu...</p>;
  if (error) return <p className="error">{error}</p>;

  // Render danh sách phòng
  return (
    <div className="room-list-container">
      <h1 className="title">Danh sách phòng</h1>
      <div className="room-grid">
        {currentRooms.map((room) => (
          <div className="room-card" key={room.RoomID}>
            <img 
              src={room.ImageUrl} 
              alt={room.RoomType} 
              className="room-image" 
            />
            <div className="room-details">
              <h2 className="room-number">{room.RoomNumber}</h2>
              <p className="room-type">Loại phòng: {room.RoomType}</p>
              <p className="room-price">Giá mỗi đêm: {room.PricePerNight} VND</p>
              <p className="room-availability">Trạng thái: {room.Availability ? 'Có sẵn' : 'Đã đặt'}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination-controls">
        <button onClick={prevPage} disabled={currentPage === 1}>
          Trang trước
        </button>
        <span>Trang {currentPage} / {Math.ceil(rooms.length / roomsPerPage)}</span>
        <button onClick={nextPage} disabled={currentPage === Math.ceil(rooms.length / roomsPerPage)}>
          Trang sau
        </button>
      </div>
    </div>
  );
};

export default RoomList;