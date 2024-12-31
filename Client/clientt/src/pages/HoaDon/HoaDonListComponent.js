import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiGetTokenClient from '../../middleWare/getTokenClient';

function HoaDonListComponent() {
    const [hoaDonList, setHoaDonList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedHoaDon, setSelectedHoaDon] = useState(null); // Hóa đơn cần xóa

    useEffect(() => {
        fetchHoaDonList();
    }, []);

    const fetchHoaDonList = () => {
        apiGetTokenClient.get('http://localhost:3000/hoadon')
            .then((response) => {
                const updatedHoaDonList = response.data.result.map(hoaDon => ({
                    ...hoaDon,
                    TrangThai: hoaDon.TrangThai,
                }));
                setHoaDonList(updatedHoaDonList);
                setLoading(false);
            })
            .catch((err) => {
                setError('Không thể tải danh sách hóa đơn');
                setLoading(false);
            });
    };

    const handleThanhToan = async (mahd) => {
        try {
            // Gửi yêu cầu PUT để cập nhật trạng thái hóa đơn
            await apiGetTokenClient.put(`http://localhost:3000/hoadon/${mahd}`, {
                trangthai: true // Cập nhật trạng thái thành true
            }).then(() => {
                console.log('Chỉnh sửa Thanh toán thành công với Mã Đơn Hàng:', mahd);
            });

            // Cập nhật trạng thái hóa đơn trong danh sách mà không gọi lại API
            fetchHoaDonList();
        } catch (err) {
            console.error('Lỗi thanh toán:', err);

            // Hiển thị thông báo lỗi cho người dùng
            setError('Có lỗi xảy ra khi thanh toán. Vui lòng thử lại sau.');
        }
    };



    const handleDelete = () => {
        if (!selectedHoaDon) return;
        apiGetTokenClient.delete(`http://localhost:3000/hoadon/${selectedHoaDon.MaHD}`)
            .then(() => {
                console.log('Xóa thành công:', selectedHoaDon.MaHD);
                fetchHoaDonList(); // Cập nhật danh sách sau khi xóa
                setSelectedHoaDon(null); // Đóng modal
            })
            .catch((err) => {
                console.error('Lỗi xóa hóa đơn:', err);
            });
    };
    console.log(">>>LIST: ", hoaDonList);
    return (
        <div className="container mt-4">
            <h2 className="text-center">Danh Sách Hóa Đơn
                &nbsp;<Link to="/tongHoaDon" className="btn btn-primary"><i className="bi bi-calculator"></i></Link>
                &nbsp;<Link to="/bieudoHoaDon" className="btn btn-primary"><i className="bi bi-plus"></i></Link>
            </h2>
            {loading && <p>Đang tải...</p>}
            {error && <div className="alert alert-danger" role="alert">{error}</div>}
            {!loading && !error && hoaDonList.length === 0 && <p>Không có hóa đơn nào.</p>}
            {!loading && !error && hoaDonList.length > 0 && (
                <table className="table table-bordered mt-4">
                    <thead className='bg-dark text-light'>
                        <tr>
                            <th>Mã Hóa Đơn</th>
                            <th>Tên Hóa Đơn</th>
                            <th>Mã Khách Hàng</th>
                            <th>Mã Đặt Phòng</th>
                            <th>Ngày Thanh Toán</th>
                            <th>Thành Tiền</th>
                            <th>Trạng Thái</th>
                            <th>Thao Tác</th>
                        </tr>
                    </thead>
                    <tbody >
                        {hoaDonList.map((hoaDon) => (
                            <tr key={hoaDon.MaHD} style={{ padding: "10px", textAlign: "center", fontWeight: "bold", color: "#333" }}>
                                <td>{hoaDon.MaHD}</td>
                                <td>{hoaDon.TenHD}</td>
                                <td>{hoaDon.MA_KH}</td>
                                <td>{hoaDon.MA_BOOK}</td>
                                <td>{hoaDon.NgayTT ? new Date(hoaDon.NgayTT).toLocaleDateString() : "Chưa thanh toán"}</td>
                                <td>{hoaDon.ThanhTien !== null && hoaDon.ThanhTien !== undefined ? hoaDon.ThanhTien.toLocaleString() : "N/A"}</td>
                                <td>{hoaDon.TrangThai === true ? (<span className="text-success">Đã thanh toán</span>) : (<span className="text-danger">Chưa thanh toán</span>)}</td>
                                <td>
                                    {hoaDon.TrangThai === false && (
                                        <button className="btn btn-success" onClick={() => handleThanhToan(hoaDon.MaHD)}>
                                            Thanh toán
                                        </button>
                                    )}
                                    &nbsp;
                                    <button className="btn btn-danger" onClick={() => setSelectedHoaDon(hoaDon)}>
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* Modal Xóa */}
            {selectedHoaDon && (
                <div className="modal fade show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Xác nhận xóa</h5>
                                <button type="button" className="btn-close" onClick={() => setSelectedHoaDon(null)}></button>
                            </div>
                            <div className="modal-body">
                                <p>Bạn có chắc chắn muốn xóa hóa đơn <strong>{selectedHoaDon.TenHD}</strong> không?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setSelectedHoaDon(null)}>
                                    Hủy
                                </button>
                                <button type="button" className="btn btn-danger" onClick={handleDelete}>
                                    Xóa
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default HoaDonListComponent;
