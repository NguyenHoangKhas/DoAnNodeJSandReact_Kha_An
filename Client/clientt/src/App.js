import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import NhanVienCreate from '../src/NhanVien/NhanVienCreate';
import NhanVienList from '../src/NhanVien/NhanVienList';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/nhanvien">Danh Sách Nhân Viên</Link></li>
            <li><Link to="/add">Thêm Nhân Viên</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/nhanvien" element={<NhanVienList />} />
          <Route path="/add" element={<NhanVienCreate />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
