const { conn, sql } = require('../connect');
module.exports = function () {
    this.getAll = async function (result) {
        var pool = await conn;
        var sqlStrin = "SELECT * FROM HoaDon";
        return await pool.request().query(sqlStrin, function (err, data) {
            if (err) {
                console.log(err)
                result(err, null);
            } else {
                result(null, data.recordset);
            }
        });
    };

    this.create = async function (newData, result) {
        console.log(">>>HOADON: ", newData)
        var pool = await conn;
        var sqlStrin = "INSERT INTO HoaDon (TenHD, MA_KH, MA_BOOK, NgayTT, ThanhTien, NhanVienID, TrangThai) VALUES(@tenhd, @ma_kh, @ma_book, @ngaytt, @thanhtien, @nhanvienid, @trangthai)";

        return await pool.request()
            .input('tenhd', sql.NVarChar, newData.TenHD)
            .input('ma_kh', sql.Int, newData.Ma_KH)
            .input('ma_book', sql.Int, newData.Ma_BOOKING)
            .input('ngaytt', sql.Date, newData.NgayTT)
            .input('thanhtien', sql.Float, newData.ThanhTien)
            .input('nhanvienid', sql.Int, newData.NhanVienID)
            .input('trangthai', sql.Bit, newData.TrangThai ? 1 : 0)
            .query(sqlStrin, function (err, data) {
                if (err) {
                    result(console.log(err), null);
                } else {
                    result(null, newData);
                }
            });
    };

    this.update = async function (id, { trangthai, ngayTT }, result) {
        try {
            const pool = await conn; // Kết nối đến cơ sở dữ liệu
            const sqlString = "UPDATE HoaDon SET TrangThai=@trangthai, NgayTT=@ngayTT WHERE MaHD=@mahd";

            console.log(">>>TRANG THAI: ", trangthai, ngayTT);
            // Thực hiện truy vấn cập nhật
            const data = await pool.request()
                .input('trangthai', sql.Bit, trangthai) // Dữ liệu trạng thái
                .input('ngayTT', sql.DateTime, ngayTT) // Dữ liệu thời gian thanh toán
                .input('mahd', sql.Int, id) // Thêm ID hóa đơn vào truy vấn
                .query(sqlString);

            // Trả lại ID của hóa đơn đã được cập nhật
            result(null, { MaHD: id, TrangThai: trangthai, NgayTT: ngayTT }); // Hoặc bạn có thể lấy giá trị mới từ cơ sở dữ liệu nếu cần
        } catch (err) {
            // Xử lý lỗi và trả lại thông báo lỗi
            console.error('Lỗi khi cập nhật hóa đơn:', err);
            result(err, null);
        }
    };



    this.delete = async function (id, result) {
        var pool = await conn;
        var sqlStrin = "DELETE FROM HoaDon WHERE MaHD=@mahd";
        return await pool.request()
            .input('mahd', sql.Int, id)
            .query(sqlStrin, function (err, data) {
                if (err) {
                    result(err, null);
                } else {
                    result(null, data);
                }
            });
    };
    this.deleteHoaDonchoNhanVien = async function (id, result) {
        var pool = await conn;
        var sqlStrin = "DELETE FROM HoaDon WHERE NhanVienID=@nhanvienid";
        return await pool.request()
            .input('nhanvienid', sql.Int, id)
            .query(sqlStrin, function (err, data) {
                if (err) {
                    result(err, null);
                } else {
                    result(null, data);
                }
            });
    };


    this.getTotalByDay = async function (ngay, result) {
        var pool = await conn;
        // Dùng 'CONVERT' hoặc 'CAST' để đảm bảo ngày được xử lý chính xác trong SQL Server
        var sqlStrin = "SELECT SUM(ThanhTien) AS Total FROM HoaDon WHERE CONVERT(DATE, NgayTT) = @ngay";
        return await pool.request()
            .input('ngay', sql.Date, ngay)  // Ngày theo định dạng 'YYYY-MM-DD'
            .query(sqlStrin, function (err, data) {
                if (err) {
                    result(err, null);
                } else {
                    result(null, data.recordset[0].Total);
                }
            });
    };



    this.getTotalByWeek = async function (tuan, nam, result) {
        var pool = await conn;
        var sqlStrin = `
            SELECT SUM(ThanhTien) AS Total 
            FROM HoaDon 
            WHERE DATEPART(WEEK, NgayTT) = @tuan AND DATEPART(YEAR, NgayTT) = @nam`;
        return await pool.request()
            .input('tuan', sql.Int, tuan)
            .input('nam', sql.Int, nam)
            .query(sqlStrin, function (err, data) {
                if (err) {
                    result(err, null);
                } else {
                    result(null, data.recordset[0].Total);
                }
            });
    };

    this.getTotalByMonth = async function (thang, nam, result) {
        var pool = await conn;
        var sqlStrin = `
            SELECT SUM(ThanhTien) AS Total 
            FROM HoaDon 
            WHERE DATEPART(MONTH, NgayTT) = @thang AND DATEPART(YEAR, NgayTT) = @nam`;
        return await pool.request()
            .input('thang', sql.Int, thang)
            .input('nam', sql.Int, nam)
            .query(sqlStrin, function (err, data) {
                if (err) {
                    result(err, null);
                } else {
                    result(null, data.recordset[0].Total);
                }
            });
    };
    this.getTotalByYear = async function (nam, result) {
        var pool = await conn;
        var sqlStrin = `
            SELECT SUM(ThanhTien) AS Total 
            FROM HoaDon 
            WHERE DATEPART(YEAR, NgayTT) = @nam`;
        return await pool.request()
            .input('nam', sql.Int, nam)
            .query(sqlStrin, function (err, data) {
                if (err) {
                    result(err, null);
                } else {
                    result(null, data.recordset[0].Total);
                }
            });
    };


};

