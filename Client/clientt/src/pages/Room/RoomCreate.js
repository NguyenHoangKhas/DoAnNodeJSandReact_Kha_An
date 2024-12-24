import React, { useState } from 'react';
import apiGetTokenClient from '../../middleWare/getTokenClient';
import '../../css/RoomCreate.css';

const RoomCreate = () => {
  const [roomNumber, setRoomNumber] = useState('');
  const [roomType, setRoomType] = useState('');
  const [pricePerNight, setPricePerNight] = useState('');
  const [availability, setAvailability] = useState(true);
  const [loaiphongid, setLoaiPhongID] = useState('');
  const [imageFile, setImageFile] = useState(null); // Lưu trữ tệp hình ảnh
  const [message, setMessage] = useState('');

  // Xử lý tải ảnh
  const handleImageUpload = async () => {
    if (!imageFile) return; // Không thực hiện nếu không có tệp

    const formData = new FormData();
    formData.append('image', imageFile);

    try {
      const response = await apiGetTokenClient.post(
        'http://localhost:3000/upload-image',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } } // Chỉ định header
      );
      // Giả sử máy chủ trả về tên tệp mới
      const newImageUrl = response.data.imageUrl; // Lưu tên tệp mới
      setMessage('Tải ảnh lên thành công!');
      return newImageUrl; // Trả về tên tệp mới
    } catch (error) {
      setMessage('Có lỗi xảy ra khi tải ảnh!');
      throw error; // Ném lỗi để xử lý bên ngoài
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newImageUrl = await handleImageUpload(); // Gọi tải lên ảnh và nhận tên tệp mới
      const newRoom = {
        roomnumber: roomNumber,
        roomtype: roomType,
        pricepernight: parseFloat(pricePerNight),
        availability,
        loaiphongid: parseInt(loaiphongid, 10),
        imageurl: newImageUrl, // Sử dụng tên tệp mới
      };

      const response = await apiGetTokenClient.post('http://localhost:3000/room', newRoom);
      if (response.data.error) {
        setMessage('Thêm phòng thất bại: ' + response.data.error);
      } else {
        setMessage('Phòng đã được thêm thành công!');
        clearForm();
      }
    } catch (error) {
      setMessage('Có lỗi xảy ra khi thêm phòng!');
    }
  };

  const clearForm = () => {
    setRoomNumber('');
    setRoomType('');
    setPricePerNight('');
    setAvailability(true);
    setLoaiPhongID('');
    setImageFile(null); // Đặt lại tệp hình ảnh
  };

  return (
    <div className="add-room-container">
      <h1 className="title">Thêm Phòng Mới</h1>
      <form onSubmit={handleSubmit} className="add-room-form">
        <label>
          Số phòng:
          <input
            type="text"
            value={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}
            required
          />
        </label>
        <label>
          Loại phòng:
          <input
            type="text"
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
            required
          />
        </label>
        <label>
          Giá mỗi đêm (VND):
          <input
            type="number"
            value={pricePerNight}
            onChange={(e) => setPricePerNight(e.target.value)}
            required
          />
        </label>
        <label>
          Trạng thái:
          <select
            value={availability}
            onChange={(e) => setAvailability(e.target.value === 'true')}
          >
            <option value="true">Có sẵn</option>
            <option value="false">Đã đặt</option>
          </select>
        </label>
        <label>
          Loại Phòng ID:
          <input
            type="number"
            value={loaiphongid}
            onChange={(e) => setLoaiPhongID(e.target.value)}
            required
          />
        </label>
        <label>
          Hoặc tải ảnh lên:
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              setImageFile(e.target.files[0]); // Lưu tệp hình ảnh
              // Không cần phải thiết lập imageUrl ở đây vì nó sẽ được thiết lập sau khi tải lên
            }}
          />
        </label>
        <button type="submit" className="add-room-button">Thêm Phòng</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default RoomCreate;
