
import { Link } from 'react-router-dom';
import MainContent from './mainContent';
import { useLocation } from 'react-router-dom';
import '../../index.css'
const Header = () => {
    const location = useLocation();  // Hook để lấy URL hiện tại
    return (
        <>
            {/* Header */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
                <div className="container">
                    <Link className="navbar-brand mmo" to="/">QLKS</Link>
                    <button className="navbar-toggler bg-dark " type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
                                <Link className="nav-link" to="/">TRANG CHỦ</Link>
                            </li>
                            <li className={`nav-item ${location.pathname.startsWith('/nhanvien') ? 'active' : ''}`}>
                                <Link className="nav-link" to="/nhanvien">NHÂN VIÊN</Link>
                            </li>
                            <li className={`nav-item ${location.pathname.startsWith('/dichVu') ? 'active' : ''}`}>
                                <Link className="nav-link" to="/dichVu">DỊCH VỤ</Link>
                            </li>
                            <li className={`nav-item ${location.pathname.startsWith('/loaiPhong') ? 'active' : ''}`}>
                                <Link className="nav-link" to="/loaiPhong">LOẠI PHÒNG</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            {/* /Header */}
            {/* Main Content */}
            <MainContent />
            {/* /Main Content */}
        </>
    )
}
export default Header;