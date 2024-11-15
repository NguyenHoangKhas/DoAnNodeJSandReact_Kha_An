import React, { useEffect, useState } from 'react';
import axios from 'axios';

function StudentList() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/student')
      .then((response) => {
        // Kiểm tra dữ liệu từ API và lưu vào state
        console.log(response.data);  // In dữ liệu để kiểm tra
        setServices(response.data.result); // Lưu dữ liệu vào state
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  }, []);  // [] để chỉ chạy 1 lần khi component được render lần đầu

  return (
    
    <div>
      <h1>Danh sách Dịch Vụ</h1>
      <ul>
        {services.length > 0 ? (
          services.map((service) => (
            <li key={service.MaDV}>
              {service.TenDV} - {service.Gia.toLocaleString()} VNĐ
            </li>
          ))
        ) : (
          <li>Không có dịch vụ nào</li>
        )}
      </ul>
    </div>
  );
}

export default StudentList;
