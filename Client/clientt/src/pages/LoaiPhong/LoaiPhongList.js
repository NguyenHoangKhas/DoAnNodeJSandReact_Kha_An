import React, { useState, useEffect } from 'react';
import apiGetTokenClient from '../../middleWare/getTokenClient';
import { useNavigate } from 'react-router-dom';
import '../../css/NhanVienList.css';

const LoaiPhongList = () => {
    const navigate = useNavigate();
    const [loaiPhong, setLoaiPhong] = useState([]);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({
        tenloaiphong: '',
        mota: '',
        succhua: '',
    });
    const [modalData, setModalData] = useState({
        show: false,
        message: '',
        onConfirm: null,
    });

    useEffect(() => {
        fetchLoaiPhong();
    }, []);

    const fetchLoaiPhong = async () => {
        try {
            const response = await apiGetTokenClient.get('http://localhost:3000/loaiphong');
            setLoaiPhong(response.data.result);
        } catch (error) {
            console.error('Error fetching LoaiPhong data:', error);
        }
    };

    const deleteLoaiPhong = async (maloaiphong) => {
        setModalData({
            show: true,
            message: 'Bạn có chắc chắn muốn xóa loại phòng này?',
            onConfirm: async () => {
                try {
                    console.log(maloaiphong)
                    await apiGetTokenClient.delete(`http://localhost:3000/loaiphong/${maloaiphong}`);
                    fetchLoaiPhong(); // Refresh data after deletion
                    setModalData({
                        show: true,
                        message: 'Xóa loại phòng thành công!',
                        onConfirm: null,
                    });
                } catch (error) {
                    console.error('Error deleting LoaiPhong:', error);
                    setModalData({
                        show: true,
                        message: 'Có lỗi xảy ra khi xóa loại phòng.',
                        onConfirm: null,
                    });
                }
            },
        });
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
            await apiGetTokenClient.put('http://localhost:3000/loaiphong', {
                maloaiphong: editingItem,
                ...formData,
            });
            setModalData({
                show: true,
                message: 'Cập nhật thành công!',
                onConfirm: null,
            });
            setEditingItem(null);
            fetchLoaiPhong(); // Refresh data after update
        } catch (error) {
            console.error('Error updating LoaiPhong:', error);
            setModalData({
                show: true,
                message: 'Có lỗi xảy ra khi cập nhật loại phòng.',
                onConfirm: null,
            });
        }
    };

    const handleModalClose = () => {
        setModalData({ show: false, message: '', onConfirm: null });
    };

    return (
        <div className="container containerCustom mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Danh Sách Loại Phòng</h2>
                <button onClick={() => navigate("/addLoaiPhong")} className="btn btn-primary">Thêm Loại Phòng</button>
            </div>
            <div className="table-responsive tableCustom">
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

            {/* Bootstrap Modal */}
            {modalData.show && (
                <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Thông báo</h5>
                                <button type="button" className="btn-close" onClick={handleModalClose}></button>
                            </div>
                            <div className="modal-body">
                                <p>{modalData.message}</p>
                            </div>
                            <div className="modal-footer">
                                {modalData.onConfirm ? (
                                    <>
                                        <button type="button" className="btn btn-secondary" onClick={handleModalClose}>Hủy</button>
                                        <button type="button" className="btn btn-primary" onClick={() => {
                                            modalData.onConfirm();
                                            handleModalClose();
                                        }}>Xác nhận</button>
                                    </>
                                ) : (
                                    <button type="button" className="btn btn-primary" onClick={handleModalClose}>Đóng</button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LoaiPhongList;
