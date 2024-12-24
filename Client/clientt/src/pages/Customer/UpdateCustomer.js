import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateCustomer = ({ customerId }) => {
    const [customer, setCustomer] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        userId: ''
    });

    useEffect(() => {
        // Lấy dữ liệu khách hàng hiện tại từ API
        axios.get(`/customer/${customerId}`)
            .then(response => {
                setCustomer(response.data.result);
            })
            .catch(error => {
                console.log("Error fetching customer:", error);
            });
    }, [customerId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomer({ ...customer, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Gửi yêu cầu cập nhật dữ liệu khách hàng
        axios.put(`http://localhost:3000/customer`, customer)
            .then(response => {
                alert("Customer updated successfully!");
            })
            .catch(error => {
                console.log("Error updating customer:", error);
            });
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Update Customer</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">First Name</label>
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
                    <label htmlFor="lastName" className="form-label">Last Name</label>
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
                    <label htmlFor="phone" className="form-label">Phone</label>
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
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </div>
    );
};

export default UpdateCustomer;
