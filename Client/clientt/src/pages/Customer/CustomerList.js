import React, { useState, useEffect } from "react";
import apiGetTokenClient from '../../middleWare/getTokenClient';

function CustomerList() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Gọi API để lấy danh sách khách hàng
    useEffect(() => {
        apiGetTokenClient
            .get("http://localhost:3000/customer")
            .then((response) => {
                setCustomers(response.data.result);
                setLoading(false); // Dừng loading
            })
            .catch((err) => {
                setError("Không thể tải danh sách khách hàng");
                setLoading(false);
            })
    }, []);

    if (loading) {
        return <div className="container mt-4">Loading...</div>;
    }

    if (error) {
        return <div className="container mt-4 text-danger">{error}</div>;
    }

    return (
        <div className="container mt-4">
            <h2>Customer List</h2>
            <table className="table table-bordered table-striped mt-3">
                <thead className="table-dark">
                    <tr>
                        <th>Customer ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>User ID</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.length > 0 ? (
                        customers.map((customer) => (
                            <tr key={customer.CustomerID}>
                                <td>{customer.CustomerID}</td>
                                <td>{customer.FirstName}</td>
                                <td>{customer.LastName}</td>
                                <td>{customer.Email}</td>
                                <td>{customer.Phone}</td>
                                <td>{customer.UserID || "N/A"}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center">No customers found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default CustomerList;
