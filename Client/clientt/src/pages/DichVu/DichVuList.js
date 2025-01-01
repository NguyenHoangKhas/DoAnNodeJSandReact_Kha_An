import React, { useEffect, useState } from 'react';
import apiGetTokenClient from '../../middleWare/getTokenClient';
import { useNavigate } from "react-router-dom"; // For navigation
import '../../css/NhanVienList.css';
import { notification } from "antd";

function DichVuList() {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Lấy danh sách dịch vụ từ API
  const fetchServices = async () => {
    try {
      const response = await apiGetTokenClient.get('http://localhost:3000/student'); // Thay URL theo API của bạn
      setServices(response.data.result);
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu:", error);
      alert("Có lỗi xảy ra khi tải dữ liệu.");
    } finally {
      setLoading(false);
    }
  };

  // Xóa một dịch vụ
  const deleteService = async (madv) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa dịch vụ với mã ${madv}?`)) {
      try {
        const response = await apiGetTokenClient.delete(`http://localhost:3000/student/${madv}`);
        if (response.status === 200) {
          notification.success({
            message: "success",
            description: `Xóa dịch vụ có Mã DV là ${madv}!`,
            placement: "topRight",
          });
          setServices(services.filter((service) => service.MaDV !== madv));
        }
      } catch (error) {
        console.error("Lỗi khi xóa dữ liệu:", error);
        alert("Có lỗi xảy ra khi xóa dịch vụ.");
      }
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  if (loading) {
    return <div className="text-center mt-4">Đang tải dữ liệu...</div>;
  }

  return (
    <div className="container containerCustom mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="text-dark">Danh Sách Dịch Vụ</h2>
        <button className='"btn btn-primary">' onClick={() => navigate("/addDichVu")}>Thêm Dịch Vụ</button>
      </div>
      <div className="table tableCustom">
        <table className="table table-hover table-striped">
          <thead className="table-dark">
            <tr>
              <th>Mã DV</th>
              <th>Tên DV</th>
              <th>Giá</th>
              <th>Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.MaDV}>
                <td>{service.MaDV}</td>
                <td>{service.TenDV}</td>
                <td>{service.Gia}</td>
                <td>
                  <button className='"btn btn-primary">' onClick={() => navigate("/updateDichVu")}>Cập Nhật</button>
                  &nbsp;
                  <button
                    onClick={() => deleteService(service.MaDV)}
                    className="btn btn-danger"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DichVuList;
