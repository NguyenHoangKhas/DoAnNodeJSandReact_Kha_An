const sql = require('mssql');

// Cấu hình kết nối
const config = {
    user: 'sa',                 // Tên tài khoản SQL Server
    password: '12345',          // Mật khẩu
    server: 'localhost',
    database: 'HotelManagement', // Tên cơ sở dữ liệu
    options: {
        encrypt: false,         // Bật mã hóa nếu cần thiết
        enableArithAbort: true  // Giải quyết lỗi toán học
    }
};

// Hàm để kết nối và trả về đối tượng kết nối
const conn = new sql.ConnectionPool(config).connect()
    .then(pool => {
        console.log("Kết nối thành công!");
        return pool;
    })
    .catch(err => {
        console.error("Kết nối thất bại:", err);
        throw err;
    });

// Export đối tượng kết nối và module sql
module.exports = {
    conn: conn,
    sql: sql
};
