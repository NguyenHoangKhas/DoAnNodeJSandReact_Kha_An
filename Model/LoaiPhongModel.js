const { conn, sql } = require('../connect');
module.exports = function () {
    this.getAll = async function (result) {
        var pool = await conn;
        var sqlStrin = "SELECT * FROM LoaiPhong";
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
        var pool = await conn;
        var sqlStrin = "INSERT INTO LoaiPhong (TenLoaiPhong, MoTa, SucChua) VALUES(@tenloaiphong, @mota, @succhua)";

        return await pool.request()
            .input('tenloaiphong', sql.VarChar, newData.tenloaiphong)
            .input('mota', sql.VarChar, newData.mota)
            .input('succhua', sql.Int, newData.succhua)

            .query(sqlStrin, function (err, data) {
                if (err) {
                    result(console.log(err), null);
                } else {
                    result(null, newData);
                }
            });
    };

    this.update = async function (newData, result) {
        var pool = await conn;
        var sqlStrin = "UPDATE LoaiPhong SET TenLoaiPhong=@tenloaiphong, MoTa=@mota, SucChua=@succhua WHERE MaLoaiPhong=@maloaiphong";
        return await pool.request()
            .input('tenloaiphong', sql.VarChar, newData.tenloaiphong)
            .input('mota', sql.VarChar, newData.mota)
            .input('succhua', sql.Int, newData.succhua)
            .input('maloaiphong', sql.Int, newData.maloaiphong)
            .query(sqlStrin, function (err, data) {
                if (err) {
                    result(err, null);
                } else {
                    result(null, newData);
                }
            });
    };

    this.delete = async function (id, result) {
        var pool = await conn;
        var sqlStrin = "DELETE FROM LoaiPhong WHERE MaLoaiPhong=@maloaiphong";
        console.log(">>>ID MLP: ", id)
        return await pool.request()
            .input('maloaiphong', sql.Int, id)
            .query(sqlStrin, function (err, data) {
                if (err) {
                    result(err, null);
                } else {
                    result(null, data);
                }
            });
    };
};