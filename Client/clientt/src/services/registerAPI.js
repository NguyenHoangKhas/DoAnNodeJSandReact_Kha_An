import axios from "axios";

const registerAPI = async (formData) => {
    try {
        const response = await axios.post("http://localhost:3000/register", formData);
        return { success: true, message: "Đăng ký thành công!" };
    } catch (error) {
        return { success: false, message: "Đăng ký thất bại. Hãy thử lại!" };
    }
};

export default registerAPI;
