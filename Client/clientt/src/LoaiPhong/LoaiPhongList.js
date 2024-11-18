import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/LoaiPhongList.css';

const LoaiPhongList = () => {
    const [loaiPhong, setLoaiPhong] = useState([]);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({
        tenloaiphong: '',
        mota: '',
        succhua: '',
    });

    useEffect(() => {
        fetchLoaiPhong();
    }, []);

    const fetchLoaiPhong = async () => {
        try {
            const response = await axios.get('http://localhost:3000/loaiphong');
            setLoaiPhong(response.data.result);
        } catch (error) {
            console.error('Error fetching LoaiPhong data:', error);
        }
    };

    const deleteLoaiPhong = async (maloaiphong) => {
        try {
            await axios.delete(`http://localhost:3000/loaiphong/${maloaiphong}`);
            fetchLoaiPhong(); // Refresh data after deletion
        } catch (error) {
            console.error('Error deleting LoaiPhong:', error);
        }
    };

    const startEditing = (item) => {
        setEditingItem(item.MaLoaiPhong);
        setFormData({
            tenloaiphong: item.TenLoaiPhong,
            mota: item.MoTa,
            succhua: item.SucChua,
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleUpdate = async () => {
        try {
            await axios.put('http://localhost:3000/loaiphong', {
                maloaiphong: editingItem,
                ...formData,
            });
            alert('Cập nhật thành công!');
            setEditingItem(null);
            fetchLoaiPhong(); // Refresh data after update
        } catch (error) {
            console.error('Error updating LoaiPhong:', error);
        }
    };

    return (
        <div className="container">
            <h1>Danh sách loại phòng</h1>
            <table>
                <thead>
                    <tr>
                        <th>Mã loại phòng</th>
                        <th>Tên loại phòng</th>
                        <th>Mô tả</th>
                        <th>Sức chứa</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {loaiPhong.map((item) => (
                        <tr key={item.MaLoaiPhong}>
                            <td>{item.MaLoaiPhong}</td>
                            <td>
                                {editingItem === item.MaLoaiPhong ? (
                                    <input
                                        type="text"
                                        name="tenloaiphong"
                                        value={formData.tenloaiphong}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    item.TenLoaiPhong
                                )}
                            </td>
                            <td>
                                {editingItem === item.MaLoaiPhong ? (
                                    <input
                                        type="text"
                                        name="mota"
                                        value={formData.mota}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    item.MoTa
                                )}
                            </td>
                            <td>
                                {editingItem === item.MaLoaiPhong ? (
                                    <input
                                        type="number"
                                        name="succhua"
                                        value={formData.succhua}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    item.SucChua
                                )}
                            </td>
                            <td>
                                {editingItem === item.MaLoaiPhong ? (
                                    <button onClick={handleUpdate}>Lưu</button>
                                ) : (
                                    <button onClick={() => startEditing(item)}>Cập nhật</button>
                                )}
                                <button onClick={() => deleteLoaiPhong(item.MaLoaiPhong)}>Xóa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LoaiPhongList;
