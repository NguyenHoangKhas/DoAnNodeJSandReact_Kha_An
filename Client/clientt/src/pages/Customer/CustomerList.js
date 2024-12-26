import React, { useState, useEffect, useContext } from "react";
import apiGetTokenClient from "../../middleWare/getTokenClient";
import { DataContext } from "../../Provider/dataProvider";
import { useNavigate } from "react-router-dom"; // For navigation

function CustomerList() {
    const navigate = useNavigate();
    const { data } = useContext(DataContext);
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [modalData, setModalData] = useState({
        show: false,
        message: "",
        onConfirm: null,
    });

    // Fetch customer data from API
    useEffect(() => {
        apiGetTokenClient
            .get("http://localhost:3000/customer")
            .then((response) => {
                setCustomers(response.data.result);
                setLoading(false);
            })
            .catch((err) => {
                setError("Không thể tải danh sách khách hàng");
                setLoading(false);
            });
    }, []);

    const handleDelete = (customerId) => {
        console.log("...: ", customerId)
        setModalData({
            show: true,
            message: "Bạn có chắc chắn muốn xóa khách hàng này?",
            onConfirm: () => {
                apiGetTokenClient
                    .delete(`http://localhost:3000/customer/${customerId}`)
                    .then(() => {
                        setCustomers(customers.filter((customer) => customer.CustomerID !== customerId));
                        setModalData({
                            show: true,
                            message: "Xóa khách hàng thành công!",
                            onConfirm: null,
                        });
                    })
                    .catch((error) => {
                        console.error("Error deleting customer:", error);
                        setModalData({
                            show: true,
                            message: "Lỗi xảy ra khi xóa khách hàng.",
                            onConfirm: null,
                        });
                    });
            },
        });
    };

    const handleModalClose = () => {
        setModalData({ show: false, message: "", onConfirm: null });
    };

    if (loading) {
        return <div className="container mt-4">Loading...</div>;
    }

    if (error) {
        return <div className="container mt-4 text-danger">{error}</div>;
    }

    return (
        <div className="container mt-4">
            <h2>
                Customer List
                {data?.role === "1" && (
                    <>
                        &nbsp;
                        <button
                            onClick={() => navigate("/themKhachHang")}
                            className="btn btn-primary"
                        >
                            <i className="bi bi-plus"></i>
                        </button>
                    </>
                )}
            </h2>
            <table className="table table-bordered table-striped mt-3">
                <thead className="table-dark">
                    <tr>
                        <th>Customer ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>User ID</th>
                        <th>Chức năng</th>
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
                                <td>
                                    <button
                                        className="btn btn-warning btn-sm mr-2"
                                        onClick={() => navigate(`/capNhatKhachHang/${customer.CustomerID}`)}
                                    >
                                        Cập Nhật
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(customer.CustomerID)}
                                    >
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className="text-center">
                                No customers found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Modal */}
            {modalData.show && (
                <div
                    className="modal show d-block"
                    tabIndex="-1"
                    style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Thông Báo</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={handleModalClose}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <p>{modalData.message}</p>
                            </div>
                            <div className="modal-footer">
                                {modalData.onConfirm ? (
                                    <>
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            onClick={handleModalClose}
                                        >
                                            Hủy
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={() => {
                                                modalData.onConfirm();
                                                handleModalClose();
                                            }}
                                        >
                                            Xác Nhận
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={handleModalClose}
                                    >
                                        Đóng
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CustomerList;
