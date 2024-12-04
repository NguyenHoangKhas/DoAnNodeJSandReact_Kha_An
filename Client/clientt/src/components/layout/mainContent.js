import { Routes, Route } from 'react-router-dom';
import NhanVienCreate from '../../pages/NhanVien/NhanVienCreate';
import NhanVienList from '../../pages/NhanVien/NhanVienList';
import DichVuCreate from '../../pages/DichVu/DichVuCreate';
import DichVuList from '../../pages/DichVu/DichVuList';
import LoaiPhongCreate from '../../pages/LoaiPhong/LoaiPhongCreate';
import LoaiPhongList from '../../pages/LoaiPhong/LoaiPhongList';
const MainContent = () => {
    return (
        <>
            <div className='mainContent'>
                <Routes>
                    <Route path="/addNhanVien" element={<NhanVienCreate />} />
                    <Route path="/nhanVien" element={<NhanVienList />} />
                    <Route path="/addDichVu" element={<DichVuCreate />} />
                    <Route path="/dichVu" element={<DichVuList />} />
                    <Route path="/addLoaiPhong" element={<LoaiPhongCreate />} />
                    <Route path="/loaiPhong" element={<LoaiPhongList />} />
                </Routes>
            </div>
        </>

    )
}
export default MainContent;