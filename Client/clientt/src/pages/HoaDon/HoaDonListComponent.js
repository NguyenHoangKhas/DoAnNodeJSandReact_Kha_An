import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiGetTokenClient from '../../middleWare/getTokenClient';

function HoaDonListComponent() {
    const [hoaDonList, setHoaDonList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Lấy danh sách hóa đơn khi component được mount
    useEffect(() => {
        apiGetTokenClient.get('http://localhost:3000/hoadon') // Thay URL nếu cần thiết
            .then((response) => {
                const updatedHoaDonList = response.data.result.map(hoaDon => ({
                    ...hoaDon,
                    TrangThai: hoaDon.TrangThai || 'Chưa thanh toán' // Nếu TrangThai là null, gán 'Chưa thanh toán'
                }));
                setHoaDonList(updatedHoaDonList); // Lưu danh sách hóa đơn vào state
                setLoading(false); // Dừng loading
            })
            .catch((err) => {
                setError('Không thể tải danh sách hóa đơn');
                setLoading(false);
            });
    }, []);

    // Hàm xử lý thanh toán
    const handleThanhToan = (mahd) => {
        apiGetTokenClient.put(`http://localhost:3000/hoadon/${mahd}/thanh-toan`)  // Đảm bảo rằng URL này là đúng
            .then((response) => {
                console.log('Thanh toán thành công:', response.data);
                // Cập nhật danh sách hóa đơn hoặc làm gì đó sau khi thanh toán
            })
            .catch((err) => {
                console.error('Lỗi thanh toán:', err);
                if (err.response) {
                    console.error('Lỗi từ server:', err.response.data);
                }
            });
    };



    return (
        <div className="container mt-4">
            <h2 className="text-center">Danh Sách Hóa Đơn
                &nbsp;<Link to="/tongHoaDon" className="btn btn-primary"><i className="bi bi-calculator"></i>
                </Link>
            </h2>
            {loading && <p>Đang tải...</p>}
            {error && <div className="alert alert-danger" role="alert">{error}</div>}
            {!loading && !error && hoaDonList.length === 0 && (
                <p>Không có hóa đơn nào.</p>
            )}
            {!loading && !error && hoaDonList.length > 0 && (
                <table className="table table-bordered mt-4">
                    <thead>
                        <tr>
                            <th>Mã Hóa Đơn</th>
                            <th>Tên Hóa Đơn</th>
                            <th>Mã Khách Hàng</th>
                            <th>Mã Đặt Phòng</th>
                            <th>Ngày Thanh Toán</th>
                            <th>Thành Tiền</th>
                            <th>Trạng Thái</th>
                            <th>Thao Tác</th> {/* Thêm cột thao tác */}
                        </tr>
                    </thead>
                    <tbody>
                        {hoaDonList.map((hoaDon) => (
                            <tr key={hoaDon.MaHD}>
                                <td>{hoaDon.MaHD}</td>
                                <td>{hoaDon.TenHD}</td>
                                <td>{hoaDon.MA_KH}</td>
                                <td>{hoaDon.MA_BOOK}</td>
                                <td>{hoaDon.NgayTT ? new Date(hoaDon.NgayTT).toLocaleDateString() : 'Chưa thanh toán'}</td>
                                <td>{hoaDon.ThanhTien.toLocaleString()}</td>
                                <td>{hoaDon.TrangThai}</td>
                                <td>
                                    {hoaDon.TrangThai === 'Chưa thanh toán' && (
                                        <button
                                            className="btn btn-success"
                                            onClick={() => handleThanhToan(hoaDon.MaHD)}
                                        >
                                            Thanh toán
                                        </button>
                                    )}
                                    {hoaDon.TrangThai === 'Đã thanh toán' && (
                                        <span className="text-success">Đã thanh toán</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default HoaDonListComponent;
