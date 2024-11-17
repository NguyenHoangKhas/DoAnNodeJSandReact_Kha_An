import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/StudentList.css'; // Import file CSS

function StudentList() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/student')
      .then((response) => {
        console.log(response.data);
        setServices(response.data.result);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  return (
    <div className="student-list-container">
      <h1 className="student-list-title">Danh sách Dịch Vụ</h1>
      <ul className="service-list">
        {services.length > 0 ? (
          services.map((service) => (
            <li key={service.MaDV} className="service-item">
              <div className="service-name">{service.TenDV}</div>
              <div className="service-price">{service.Gia.toLocaleString()} VNĐ</div>
            </li>
          ))
        ) : (
          <li className="no-service">Không có dịch vụ nào</li>
        )}
      </ul>
    </div>
  );
}

export default StudentList;
