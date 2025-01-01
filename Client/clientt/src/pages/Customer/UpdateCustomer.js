import React, { useState } from 'react';
import apiGetTokenClient from '../../middleWare/getTokenClient';
import { useLocation, useNavigate } from "react-router-dom";
import { notification } from "antd";

const UpdateCustomer = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dataCustomer = location.state?.customer;
    const customerId = dataCustomer.CustomerID;
    const userID = dataCustomer.UserID;
    const [customer, setCustomer] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        userId: parseInt(userID),
        customerid: customerId
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomer({ ...customer, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Gửi yêu cầu cập nhật dữ liệu khách hàng
        console.log("REACT: ", customer);

        apiGetTokenClient.put(`http://localhost:3000/customer`, customer)
            .then(response => {
                notification.success({
                    message: "success",
                    description: `Cập nhật khách hàng ${customerId} thành công!`,
                    placement: "topRight",
                });
                navigate("/listKhachHang");
            })
            .catch(error => {
                console.log("Error updating customer:", error);
            });
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Cập Nhật Khách Hàng</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">Họ</label>
                    <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        name="firstName"
                        value={customer.firstName}
                        onChange={handleInputChange}
                        placeholder="Enter first name"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">Tên</label>
                    <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        name="lastName"
                        value={customer.lastName}
                        onChange={handleInputChange}
                        placeholder="Enter last name"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={customer.email}
                        onChange={handleInputChange}
                        placeholder="Enter email"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Số điện thoại</label>
                    <input
                        type="text"
                        className="form-control"
                        id="phone"
                        name="phone"
                        value={customer.phone}
                        onChange={handleInputChange}
                        placeholder="Enter phone number"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="userId" className="form-label">User ID</label>
                    <input
                        type="number"
                        className="form-control"
                        id="userId"
                        name="userId"
                        value={customer.userId}
                        onChange={handleInputChange}
                        placeholder="Enter user ID"
                    />
                </div>
                <button type="submit" className="btn btn-primary">Cập nhật</button>
            </form>
        </div>
    );
};

export default UpdateCustomer;
