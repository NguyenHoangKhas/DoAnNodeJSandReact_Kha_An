import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BackButton from '../../components/backButton';

const RoomList2 = () => {
  const [rooms, setRooms] = useState([]);
  const [roomToDelete, setRoomToDelete] = useState(null); // Trạng thái để lưu room cần xóa
  const navigate = useNavigate();

  // Fetch list of rooms
  const fetchRooms = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:3000/room");
      setRooms(response.data.result);
    } catch (err) {
      console.error("Error fetching rooms:", err);
    }
  }, []);

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  // Delete a room
  const handleDeleteRoom = async (roomId) => {
    try {
      await axios.delete(`http://localhost:3000/room/${roomId}`);
      fetchRooms(); // Tải lại danh sách phòng sau khi xóa
    } catch (err) {
      console.error("Error deleting room:", err);
    }
  };

  // Navigate to the update page
  const handleUpdateRoom = (room) => {
    navigate("/capNhatPhong", { state: { room } });
  };

  // Mở modal xác nhận xóa
  const openDeleteModal = (room) => {
    setRoomToDelete(room); // Set room cần xóa
    window.$('#deleteModal').modal('show'); // Hiển thị modal
  };

  // Đóng modal
  const closeModal = () => {
    setRoomToDelete(null);
    window.$('#deleteModal').modal('hide');
    window.location.reload();
  };

  return (
    <div className="container my-5">
      <BackButton />
      <h1 className="text-center mb-4">Danh Sách Phòng</h1>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Số Phòng</th>
              <th>Loại Phòng</th>
              <th>Giá Mỗi Đêm</th>
              <th>Trạng Thái</th>
              <th>ID Loại Phòng</th>
              <th>URL Hình Ảnh</th>
              <th>Chức Năng</th>
            </tr>
          </thead>
          <tbody>
            {rooms.length > 0 ? (
              rooms.map((room) => (
                <tr key={room.RoomID}>
                  <td>{room.RoomID}</td>
                  <td>{room.RoomNumber}</td>
                  <td>{room.RoomType}</td>
                  <td>{room.PricePerNight}</td>
                  <td>{room.Availability ? "Sẵn Sàn" : "Đã Hết"}</td>
                  <td>{room.LoaiPhongID}</td>
                  <td>
                    <a href={room.ImageUrl} target="_blank" rel="noopener noreferrer">
                      Xem Ảnh
                    </a>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary me-2"
                      onClick={() => handleUpdateRoom(room)}
                    >
                      Cập Nhật
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => openDeleteModal(room)} // Mở modal xác nhận xóa
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">Không có phòng nào</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal xác nhận xóa */}
      <div className="modal fade" id="deleteModal" tabIndex="-1" role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteModalLabel">Xác Nhận Xóa</h5>
              <button type="button" className="close" onClick={closeModal} aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              Bạn có chắc chắn muốn xóa phòng <strong>{roomToDelete ? roomToDelete.RoomNumber : ''}</strong> không?
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={closeModal}>Hủy</button>
              <button type="button" className="btn btn-danger" onClick={() => {
                if (roomToDelete) {
                  handleDeleteRoom(roomToDelete.RoomID); // Gọi hàm xóa
                  closeModal(); // Đóng modal
                }
              }}>
                Xóa
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomList2;
