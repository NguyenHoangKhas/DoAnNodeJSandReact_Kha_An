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
import NotFound from '../../pages/ErrorPage';
import { useContext } from 'react';
import { DataContext } from '../../Provider/dataProvider';
const MainContent = () => {
    const { data } = useContext(DataContext);
    return (
        <>
            <div className='mainContent'>
                <Routes>
                    {/* Admin Routes */}
                    {data?.role === '1' && ( // Đảm bảo so sánh đúng kiểu dữ liệu
                        <>
                            <Route path="/addNhanVien" element={<NhanVienCreate />} />
                            <Route path="/nhanVien" element={<NhanVienList />} />
                            <Route path="/addDichVu" element={<DichVuCreate />} />
                            <Route path="/dichVu" element={<DichVuList />} />
                            <Route path="/addLoaiPhong" element={<LoaiPhongCreate />} />
                            <Route path="/loaiPhong" element={<LoaiPhongList />} />
                            <Route path="/themPhong" element={<RoomCreate />} />
                        </>
                    )}
                    {/* Client Routes */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/room" element={<RoomList />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    {/* Route Not Found */}
                    <Route path="*" element={<NotFound />} /> {/* Bắt tất cả các đường dẫn không hợp lệ */}
                </Routes>
            </div>
        </>

    )
}
export default MainContent;