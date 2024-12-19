import axios from "axios";

const loginAPI = async (formData) => {
    const Username = formData.usernameOrEmail;
    const PasswordHash = formData.password;
    try {
        const response = await axios.post("http://localhost:3000/login", { Username, PasswordHash });

        if (response.status === 200) {
            const success = response.data.success
            const message = response.data.message
            const token = response.data.token
            const data = response.data.data
            return {
                success,
                message,
                token,
                data
            }
        }
    } catch (error) {
        console.error("Đăng nhập thất bại!", error);
    }
};
export default loginAPI;