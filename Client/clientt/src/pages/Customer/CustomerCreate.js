import React, { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import apiGetTokenClient from '../../middleWare/getTokenClient';
function CreateCustomer() {
    const location = useLocation();
    const idPhong = location.state?.idPhong;
    const totalMoney = location.state?.totalMoney;
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        FirstName: "",
        LastName: "",
        Email: "",
        Phone: "",
        UserID: "", // Đảm bảo rằng UserID là null nếu không cần thiết
    });

    const [message, setMessage] = useState("");

    // Xử lý thay đổi giá trị input
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Xử lý submit form
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Thêm kiểm tra dữ liệu ở đây nếu cần
        if (!formData.FirstName || !formData.LastName || !formData.Email || !formData.Phone) {
            setMessage("Vui lòng điền đầy đủ thông tin.");
            return;
        }

        try {
            console.log(formData)
            await apiGetTokenClient.post("http://localhost:3000/customer", formData);
            setMessage("Customer created successfully!");
            setFormData({
                FirstName: "",
                LastName: "",
                Email: "",
                Phone: "",
                UserID: "",
            });

            // Chuyển hướng sau khi tạo thành công
            navigate('/datPhong', { state: { idPhong, totalMoney } });
        } catch (error) {
            console.error("Error creating customer:", error);
            // Xử lý lỗi phản hồi từ server
            if (error.response && error.response.data) {
                setMessage(error.response.data.message || "Failed to create customer. Please try again.");
            } else {
                setMessage("Failed to create customer. Please check your input.");
            }
        }
    };

    return (
        <div className="container mt-4">
            <h2>Nhập Thông Tin</h2>
            {message && <div className="alert alert-info">{message}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="FirstName" className="form-label">
                        Tên
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="FirstName"
                        name="FirstName"
                        value={formData.FirstName}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="LastName" className="form-label">
                        Họ
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="LastName"
                        name="LastName"
                        value={formData.LastName}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="Email" className="form-label">
                        Email
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="Email"
                        name="Email"
                        value={formData.Email}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="Phone" className="form-label">
                        Số điện thoại
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="Phone"
                        name="Phone"
                        value={formData.Phone}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Xác nhận
                </button>
            </form>
        </div>
    );
}

export default CreateCustomer;
