import { useNavigate } from 'react-router-dom';

const BackButton = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1); // Quay lại trang trước đó
    };

    return (
        <button onClick={handleBack} className="btn btn-primary"><i className="bi bi-arrow-left">&nbsp;Quay về</i></button>
    );
}
export default BackButton;