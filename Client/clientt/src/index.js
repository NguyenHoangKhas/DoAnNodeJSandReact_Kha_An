import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
//import StudentList from './DichVu/DichVuCreate';
import reportWebVitals from './reportWebVitals';
//import NhanVienCreate from './NhanVien/NhanVienCreate';
// import NhanVienList from './NhanVien/NhanVienList';
//import App from './App';
//import DichVuList from './DichVu/DichVuList';
// import LoaiPhongList from './LoaiPhong/LoaiPhongList';
// import LoaiPhongCreate from './LoaiPhong/LoaiPhongCreate';
import TotalAmount from './pages/HoaDon/TotalAmount ';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <TotalAmount />
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
