import React, { useEffect, useState } from 'react';
import apiGetTokenClient from '../../middleWare/getTokenClient';
import { Link } from 'react-router-dom';
import '../../css/NhanVienList.css'

function DichVuList() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Lấy danh sách dịch vụ từ API
  const fetchServices = async () => {
    try {
      const response = await apiGetTokenClient.get('http://localhost:3000/student'); // Thay URL theo API của bạn
      setServices(response.data.result);
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu:", error);
    } finally {
      setLoading(false);
    }
  };

  // Xóa một dịch vụ
  const deleteService = async (madv) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa dịch vụ với mã ${madv}?`)) {
      try {
        await apiGetTokenClient.delete(`http://localhost:3000/student/${madv}`);
        alert("Xóa thành công!");
        setServices(services.filter((service) => service.MaDV !== madv));
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
        <Link to="/addDichVu" className="btn btn-primary">
          Thêm Dịch Vụ
        </Link>
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
                  <button
                    onClick={() => alert(`Chỉnh sửa dịch vụ: ${service.MaDV}`)}
                    className="btn btn-warning text-dark btn-sm me-2"
                  >
                    Chỉnh Sửa
                  </button>
                  <button
                    onClick={() => deleteService(service.MaDV)}
                    className="btn btn-danger btn-sm"
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
