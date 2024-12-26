import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../css/RoomList.css';
import { DataContext } from '../../Provider/dataProvider';

const RoomList = () => {
  const navigate = useNavigate();
  const { data } = useContext(DataContext);
  // Room
  const [rooms, setRooms] = useState([]); // Danh sách phòng gốc
  const [filteredRooms, setFilteredRooms] = useState([]); // Danh sách phòng sau tìm kiếm
  const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu
  const [error, setError] = useState(null); // Trạng thái lỗi
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [searchTerm, setSearchTerm] = useState(''); // Từ khóa tìm kiếm
  const roomsPerPage = 6; // Số phòng mỗi trang

  // Hàm gọi API để lấy danh sách phòng
  const fetchRooms = async () => {
    try {
      const response = await axios.get('http://localhost:3000/room'); // API lấy danh sách phòng
      setRooms(response.data.result); // Lưu dữ liệu vào state
      setFilteredRooms(response.data.result); // Gắn danh sách phòng vào danh sách hiển thị
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

  // Hàm xử lý tìm kiếm
  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase(); // Lấy giá trị tìm kiếm
    setSearchTerm(value);

    // Lọc danh sách phòng theo giá trị tìm kiếm
    const filtered = rooms.filter(
      (room) =>
        room.RoomType.toLowerCase().includes(value) ||
        room.RoomNumber.toLowerCase().includes(value) ||
        room.PricePerNight.toString().includes(value)
    );
    setFilteredRooms(filtered); // Cập nhật danh sách hiển thị
    setCurrentPage(1); // Đặt lại trang về 1
  };

  // Xác định các phòng hiện tại dựa trên trang
  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);

  // Hàm chuyển trang
  const nextPage = () => {
    if (currentPage < Math.ceil(filteredRooms.length / roomsPerPage)) {
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
      <h1 className="title">Danh sách phòng
        {data?.role === "1" && (
          <>
            &nbsp;
            <button onClick={() => navigate("/themPhong")} className="btn btn-primary"><i className="bi bi-plus"></i></button>
            &nbsp;
            <button onClick={() => navigate("/suaPhong")} className="btn btn-primary"><i className="bi bi-pen"></i></button>
          </>
        )}
      </h1>
      {/* Ô tìm kiếm */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Tìm kiếm theo số phòng, loại phòng hoặc giá..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
      </div>

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
              <div style={{ textAlign: 'center' }}>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    const token = localStorage.getItem('token'); // Kiểm tra token
                    const idPhong = room.RoomID;
                    const totalMoney = room.PricePerNight;
                    if (token) {
                      navigate('/themKhachHang', { state: { idPhong, totalMoney } }); // Điều hướng đến trang đặt phòng nếu đã đăng nhập
                    } else {
                      navigate('/login'); // Điều hướng đến trang đăng nhập nếu chưa đăng nhập
                    }
                  }}
                >
                  Đặt Phòng
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Điều hướng phân trang */}
      <div className="pagination-controls">
        <button onClick={prevPage} disabled={currentPage === 1}>
          Trang trước
        </button>
        <span>Trang {currentPage} / {Math.ceil(filteredRooms.length / roomsPerPage)}</span>
        <button onClick={nextPage} disabled={currentPage === Math.ceil(filteredRooms.length / roomsPerPage)}>
          Trang sau
        </button>
      </div>
    </div>
  );
};

export default RoomList;
