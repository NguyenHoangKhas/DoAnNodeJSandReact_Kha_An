import React, { useState } from 'react';
import axios from 'axios';
import '../css/RoomCreate.css';

const RoomCreate = () => {
  const [roomNumber, setRoomNumber] = useState('');
  const [roomType, setRoomType] = useState('');
  const [pricePerNight, setPricePerNight] = useState('');
  const [availability, setAvailability] = useState(true);
  const [loaiphongid, setLoaiPhongID] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newRoom = {
      roomnumber: roomNumber,
      roomtype: roomType,
      pricepernight: parseFloat(pricePerNight),
      availability,
      loaiphongid: parseInt(loaiphongid, 10),
      imageurl: imageUrl,
    };

    try {
      const response = await axios.post('http://localhost:3000/room', newRoom);
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
    setImageUrl('');
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
          URL Hình ảnh:
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </label>
        <button type="submit" className="add-room-button">Thêm Phòng</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default RoomCreate;
