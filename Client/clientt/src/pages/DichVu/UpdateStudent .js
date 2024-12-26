import React, { useState } from 'react';
import apiGetTokenClient from '../../middleWare/getTokenClient';
import BackButton from '../../components/backButton';

const UpdateDichVu = () => {
    const [service, setService] = useState({
        MaDV: '',
        TenDV: '',
        Gia: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setService({ ...service, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Gửi yêu cầu PUT để cập nhật thông tin dịch vụ
        try {
            await apiGetTokenClient.put(`http://localhost:3000/student/`, service);
            console.log(">>>SERVER: ", service)
            alert("Cập nhật thông tin dịch vụ thành công!");
        } catch (error) {
            console.error("Có lỗi xảy ra khi cập nhật thông tin dịch vụ:", error);
            alert("Có lỗi xảy ra khi cập nhật thông tin dịch vụ.");
        }
    };

    return (
        <div className="container mt-5">
            <BackButton />
            <h2 className="mb-4">Cập Nhật Dịch Vụ</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="MaDV" className="form-label">Mã DV</label>
                    <input
                        type="text"
                        className="form-control"
                        id="MaDV"
                        name="MaDV"
                        value={service.MaDV}
                        onChange={handleInputChange}
                        placeholder="Nhập mã dịch vụ"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="TenDV" className="form-label">Tên DV</label>
                    <input
                        type="text"
                        className="form-control"
                        id="TenDV"
                        name="TenDV"
                        value={service.TenDV}
                        onChange={handleInputChange}
                        placeholder="Nhập tên dịch vụ"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="Gia" className="form-label">Giá</label>
                    <input
                        type="text"
                        className="form-control"
                        id="Gia"
                        name="Gia"
                        value={service.Gia}
                        onChange={handleInputChange}
                        placeholder="Nhập giá dịch vụ"
                    />
                </div>
                <button type="submit" className="btn btn-primary">Cập Nhật</button>
            </form>
        </div>
    );
};

export default UpdateDichVu;
