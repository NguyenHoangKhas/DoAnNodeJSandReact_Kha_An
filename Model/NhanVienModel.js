const { conn, sql } = require('../connect');
module.exports = function() {
    this.getAll = async function(result) {
        var pool = await conn;
        var sqlStrin = "SELECT * FROM NhanVien";
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
        var sqlStrin = "INSERT INTO NhanVien (FirstNameNV, LastNameNV, ChucVu, DiaChi) VALUES(@firstnamenv, @lastnamenv, @chucvu, @diachi)";
        
        return await pool.request()
            .input('firstnamenv', sql.VarChar, newData.firstnamenv)
            .input('lastnamenv', sql.VarChar, newData.lastnamenv)
            .input('chucvu', sql.VarChar, newData.chucvu)
            .input('diachi', sql.VarChar, newData.diachi)
            
            .query(sqlStrin, function(err, data) {
                if (err) {
                    result(err, null); 
                } else {
                    result(null, newData); 
                }
            });
    };

    this.update = async function(newData, result) {
        var pool = await conn;
        var sqlStrin = "UPDATE NhanVien SET FirstNameNV=@firstnamenv, LastNameNV=@lastnamenv, ChucVu=@chucvu, DiaChi=@diachi WHERE NhanVienID=@nhanvienid";
        return await pool.request()
            .input('firstnamenv', sql.VarChar, newData.firstnamenv)
            .input('lastnamenv', sql.VarChar, newData.lastnamenv)
            .input('chucvu', sql.VarChar, newData.chucvu)
            .input('diachi', sql.VarChar, newData.diachi)
            .input('nhanvienid', sql.Int, newData.nhanvienid)
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
        var sqlStrin = "DELETE FROM NhanVien WHERE NhanVienID=@nhanvienid";
        return await pool.request()
            .input('nhanvienid', sql.Int, id)
            .query(sqlStrin, function(err, data) {
                if (err) {
                    result(err, null); 
                } else {
                    result(null, data); 
                }
            });
    };
};