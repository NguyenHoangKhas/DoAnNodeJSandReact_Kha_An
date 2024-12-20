import React, { useState } from 'react';
import apiGetTokenClient from '../../middleWare/getTokenClient';
import '../../css/LoaiPhongCreate.css';

const LoaiPhongCreate = () => {
    const [formData, setFormData] = useState({
        tenloaiphong: '',
        mota: '',
        succhua: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await apiGetTokenClient.post('http://localhost:3000/loaiphong', formData);
            alert('Thêm loại phòng thành công!');
            setFormData({
                tenloaiphong: '',
                mota: '',
                succhua: '',
            });
        } catch (error) {
            console.error('Error adding LoaiPhong:', error);
        }
    };

    return (
        <div className="form-container">
            <h1>Thêm loại phòng</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="tenloaiphong">Tên loại phòng:</label>
                    <input
                        type="text"
                        id="tenloaiphong"
                        name="tenloaiphong"
                        value={formData.tenloaiphong}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="mota">Mô tả:</label>
                    <input
                        type="text"
                        id="mota"
                        name="mota"
                        value={formData.mota}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="succhua">Sức chứa:</label>
                    <input
                        type="number"
                        id="succhua"
                        name="succhua"
                        value={formData.succhua}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Thêm</button>
            </form>
        </div>
    );
};

export default LoaiPhongCreate;
