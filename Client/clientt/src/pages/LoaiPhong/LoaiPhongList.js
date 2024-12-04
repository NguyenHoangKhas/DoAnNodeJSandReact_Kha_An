import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../css/NhanVienList.css';

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
        if (window.confirm('Bạn có chắc chắn muốn xóa loại phòng này?')) {
            try {
                await axios.delete(`http://localhost:3000/loaiphong/${maloaiphong}`);
                fetchLoaiPhong(); // Refresh data after deletion
                alert('Xóa loại phòng thành công!');
            } catch (error) {
                console.error('Error deleting LoaiPhong:', error);
                alert('Có lỗi xảy ra khi xóa loại phòng.');
            }
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
            alert('Có lỗi xảy ra khi cập nhật loại phòng.');
        }
    };

    return (
        <div className="container containerCustom mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Danh Sách Loại Phòng</h2>
                <Link to="/addLoaiPhong" className="btn btn-primary">
                    Thêm Loại Phòng
                </Link>
            </div>
            <div className="table-responsive tableCustom"> {/* Thêm lớp này để làm cho bảng phản hồi */}
                <table className="table table-hover table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th>Mã Loại Phòng</th>
                            <th>Tên Loại Phòng</th>
                            <th>Mô Tả</th>
                            <th>Sức Chứa</th>
                            <th>Hành Động</th>
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
                                            className="form-control"
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
                                            className="form-control"
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
                                            className="form-control"
                                        />
                                    ) : (
                                        item.SucChua
                                    )}
                                </td>
                                <td>
                                    {editingItem === item.MaLoaiPhong ? (
                                        <button onClick={handleUpdate} className="btn btn-success btn-sm me-2">
                                            Lưu
                                        </button>
                                    ) : (
                                        <button onClick={() => startEditing(item)} className="btn btn-warning btn-sm me-2">
                                            Cập Nhật
                                        </button>
                                    )}
                                    <button onClick={() => deleteLoaiPhong(item.MaLoaiPhong)} className="btn btn-danger btn-sm">
                                        Xóa
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

export default LoaiPhongList;
