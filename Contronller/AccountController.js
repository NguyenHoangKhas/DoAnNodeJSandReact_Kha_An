const UserModel = require('../Model/AccountModel');
// Khởi tạo các model
const userModel = new UserModel();

// Express: bcrypt - băm mật khẩu. Và macaddreee - lấy địa chỉ mac của user
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config();

exports.postRegister = async function (req, res) {
    const { username, email, password } = req.body;
    console.log(">>>REQ BODY: " + req.body);
    try {
        // Kiểm tra tài khoản đã tồn tại
        const userExists = await userModel.checkUserExists(email);
        if (userExists.length > 0) {
            return res.status(400).send("Email đã tồn tại.");
        }

        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(password, 10);

        // Đăng ký người dùng
        await userModel.registerUser({
            username,
            email,
            password: hashedPassword,
        });

        res.status(200).send("Đăng ký thành công!");
    } catch (err) {
        console.error(err);
        res.status(500).send("Đã xảy ra lỗi.");
    }
};
exports.postLogin = async function (req, res) {
    const { Username, PasswordHash } = req.body;
    try {
        const user = await userModel.loginUser({ Username });
        if (!user) {
            return res.status(404).json({ success: false, message: "Người dùng không tồn tại" });
        }

        const isPasswordValid = await bcrypt.compare(PasswordHash, user.PasswordHash);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: "Mật khẩu không chính xác" });
        }

        const token = jwt.sign(
            { id: user.MaUser, username: user.Username, email: user.Email, role: user.Role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRE }
        );

        res.json({
            success: true,
            message: "Đăng nhập thành công",
            token,
            data: {
                id: user.MaUser,
                username: user.Username,
                email: user.Email,
                role: user.Role

            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Lỗi máy chủ" });
    }
};