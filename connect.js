const sql = require('mssql/msnodesqlv8');

const config = {
    driver: "msnodesqlv8",
    connectionString: "DSN=TestSQLServer;UID=sa;PWD=12345;"
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

module.exports = {
    conn: conn,
    sql: sql
};
