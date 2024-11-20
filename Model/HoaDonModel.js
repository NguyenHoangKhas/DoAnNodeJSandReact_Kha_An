const { conn, sql } = require('../connect');
module.exports = function() {
    this.getAll = async function(result) {
        var pool = await conn;
        var sqlStrin = "SELECT * FROM HoaDon";
        return await pool.request().query(sqlStrin, function(err, data) {
            if (err) {
                console.log(err)
                result(err, null);
            } else {
                result(null, data.recordset);
            }
        });
    };

    this.create = async function(newData, result) {
        var pool = await conn;
        var sqlStrin = "INSERT INTO HoaDon (TenHD, MA_KH, MA_BOOK, NgayTT, ThanhTien, NhanVienID) VALUES(@tenhd, @ma_kh, @ma_book, @ngaytt, @thanhtien, @nhanvienid)";
        
        return await pool.request()
            .input('tenhd', sql.VarChar, newData.tenhd)
            .input('ma_kh', sql.Int, newData.ma_kh)
            .input('ma_book', sql.Int, newData.ma_book)
            .input('ngaytt', sql.Date, newData.ngaytt)
            .input('thanhtien', sql.Float, newData.thanhtien)
            .input('nhanvienid', sql.Int, newData.nhanvienid)
            
            .query(sqlStrin, function(err, data) {
                if (err) {
                    result(console.log(err), null); 
                } else {
                    result(null, newData); 
                }
            });
    };

    this.update = async function(newData, result) {
        var pool = await conn;
        var sqlStrin = "UPDATE HoaDon SET TenHD=@tenhd, MA_KH=@ma_kh, MA_BOOK=@ma_book, NgayTT=@ngaytt, ThanhTien=@thanhtien, NhanVienID=@nhanvienid WHERE MaHD=@mahd";
        return await pool.request()
            .input('tenhd', sql.VarChar, newData.tenhd)
            .input('ma_kh', sql.Int, newData.ma_kh)
            .input('ma_book', sql.Int, newData.ma_book)
            .input('ngaytt', sql.Date, newData.ngaytt)
            .input('thanhtien', sql.Float, newData.thanhtien)
            .input('nhanvienid', sql.Int, newData.nhanvienid)
            .input('mahd', sql.Int, newData.mahd)
            .query(sqlStrin, function(err, data) {
                if (err) {
                    result(err, null); 
                } else {
                    result(null, newData); 
                }
            });
    };

    this.delete = async function(id, result) {
        var pool = await conn;
        var sqlStrin = "DELETE FROM HoaDon WHERE MaHD=@mahd";
        return await pool.request()
            .input('mahd', sql.Int, id)
            .query(sqlStrin, function(err, data) {
                if (err) {
                    result(err, null); 
                } else {
                    result(null, data); 
                }
            });
    };
};