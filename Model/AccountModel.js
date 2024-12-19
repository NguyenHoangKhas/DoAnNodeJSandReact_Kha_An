const { conn, sql } = require('../connect');
module.exports = class UserModel {
    async checkUserExists(email) {
        try {
            console.log("Đã chạy qua check Email");
            const pool = await conn;
            const result = await pool
                .request()
                .input("email", sql.VarChar, email)
                .query("SELECT * FROM UserDangNhap WHERE Email = @email");
            return result.recordset;
        } catch (err) {
            throw err;
        }
    }

    async registerUser(user) {
        try {
            console.log("Đã chạy qua Register Email");
            const pool = await conn;
            await pool
                .request()
                .input("username", sql.VarChar, user.username)
                .input("email", sql.VarChar, user.email)
                .input("password", sql.VarChar, user.password)
                .input("role", sql.Int, 0)
                .query(`
                    INSERT INTO UserDangNhap (Username, Email, PasswordHash, CreatedAt, Role)
                    VALUES (@username, @email, @password, GETDATE(), @role)
                `);
        } catch (err) {
            throw err;
        }
    }

    async loginUser(usernameOrEmail) {
        try {
            const pool = await conn;
            console.log("Login model: " + usernameOrEmail.Username)
            const result = await pool
                .request()
                .input("usernameOrEmail1", sql.VarChar, usernameOrEmail.Username)
                .query("SELECT * FROM UserDangNhap WHERE Username = @usernameOrEmail1 OR Email = @usernameOrEmail1");
            console.log(result.recordset[0])
            return result.recordset[0];
        } catch (error) {
            console.error("Lỗi khi đăng nhập:", error);
            throw error; // Hoặc xử lý lỗi theo cách bạn muốn
        }
    }

};
