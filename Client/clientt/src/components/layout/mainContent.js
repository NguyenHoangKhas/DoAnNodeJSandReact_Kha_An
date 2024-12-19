import { Routes, Route } from 'react-router-dom';
import NhanVienCreate from '../../pages/NhanVien/NhanVienCreate';
import NhanVienList from '../../pages/NhanVien/NhanVienList';
import DichVuCreate from '../../pages/DichVu/DichVuCreate';
import DichVuList from '../../pages/DichVu/DichVuList';
import LoaiPhongCreate from '../../pages/LoaiPhong/LoaiPhongCreate';
import LoaiPhongList from '../../pages/LoaiPhong/LoaiPhongList';
import RoomList from '../../pages/Room/RoomList';
import RoomCreate from '../../pages/Room/RoomCreate';
import HomePage from '../../pages/HomePage';
import LoginPage from '../../pages/Account/loginPage';
import RegisterPage from '../../pages/Account/registerPage';
const MainContent = () => {
    return (
        <>
            <div className='mainContent'>
                <Routes>
                    {/* Admin */}
                    <Route path="/addNhanVien" element={<NhanVienCreate />} />
                    <Route path="/nhanVien" element={<NhanVienList />} />
                    <Route path="/addDichVu" element={<DichVuCreate />} />
                    <Route path="/dichVu" element={<DichVuList />} />
                    <Route path="/addLoaiPhong" element={<LoaiPhongCreate />} />
                    <Route path="/loaiPhong" element={<LoaiPhongList />} />
                    <Route path="/themPhong" element={<RoomCreate />} />
                    {/* Client */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/phong" element={<RoomList />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/login" element={<LoginPage />} />

                </Routes>
            </div>
        </>

    )
}
export default MainContent;