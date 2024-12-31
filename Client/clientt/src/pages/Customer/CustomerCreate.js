import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import apiGetTokenClient from '../../middleWare/getTokenClient';
import { DataContext } from '../../Provider/dataProvider';

function CreateCustomer() {
    const { data } = useContext(DataContext);
    const location = useLocation();
    const idPhong = location.state?.idPhong;
    const namePhong = location.state?.namePhong;
    const totalMoney = location.state?.totalMoney;
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        FirstName: "",
        LastName: "",
        Email: "",
        Phone: "",
        UserID: data?.id ? parseInt(data.id) : null,
    });

    const [message, setMessage] = useState("");

    // Xử lý thay đổi giá trị input
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Kiểm tra UserID đã tồn tại hay chưa
    const checkUserExists = async (userID) => {
        try {
            const response = await apiGetTokenClient.get(`http://localhost:3000/customer/${userID}`);
            return response.data.exists; // Giả sử API trả về { exists: true/false }
        } catch (error) {
            console.error("Error checking user existence:", error);
            return false; // Nếu có lỗi, coi như người dùng chưa tồn tại
        }
    };

    // Xử lý submit form
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Thêm kiểm tra dữ liệu ở đây nếu cần
        if (!formData.FirstName || !formData.LastName || !formData.Email || !formData.Phone) {
            setMessage("Vui lòng điền đầy đủ thông tin.");
            return;
        }

        // Kiểm tra xem UserID đã được tạo chưa
        const userExists = await checkUserExists(formData.UserID);
        if (userExists) {
            setMessage("Người dùng đã tồn tại. Mỗi người dùng chỉ được tạo một lần.");
            return;
        }

        try {
            await apiGetTokenClient.post("http://localhost:3000/customer", formData);
            setMessage("Khách hàng đã được tạo thành công!");
            setFormData({
                FirstName: "",
                LastName: "",
                Email: "",
                Phone: "",
                UserID: "",
            });

            // Chuyển hướng sau khi tạo thành công
            const userid = formData.UserID;
            navigate('/datPhong', { state: { userid, idPhong, totalMoney, namePhong } });
        } catch (error) {
            console.error("Lỗi khi tạo khách hàng:", error);
            // Xử lý lỗi phản hồi từ server
            if (error.response && error.response.data) {
                setMessage(error.response.data.message || "Không thể tạo khách hàng. Vui lòng thử lại.");
            } else {
                setMessage("Không thể tạo khách hàng. Vui lòng kiểm tra thông tin của bạn.");
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
