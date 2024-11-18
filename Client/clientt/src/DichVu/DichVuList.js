import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/DichVuList.css'
function DichVuList() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Lấy danh sách dịch vụ từ API
  const fetchServices = async () => {
    try {
      const response = await axios.get('http://localhost:3000/student'); // Thay URL theo API của bạn
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
        await axios.delete(`http://localhost:3000/student/${madv}`);
        alert("Xóa thành công!");
        setServices(services.filter(service => service.MaDV !== madv));
      } catch (error) {
        console.error("Lỗi khi xóa dữ liệu:", error);
      }
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  if (loading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  return (
    <div>
      <h1>Danh sách dịch vụ</h1>
      <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Mã DV</th>
            <th>Tên DV</th>
            <th>Giá</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.MaDV}>
              <td>{service.MaDV}</td>
              <td>{service.TenDV}</td>
              <td>{service.Gia}</td>
              <td>
                <button onClick={() => alert(`Chỉnh sửa dịch vụ: ${service.MaDV}`)}>Chỉnh sửa</button>
                <button onClick={() => deleteService(service.MaDV)} style={{ marginLeft: '10px', color: 'red' }}>
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DichVuList;
