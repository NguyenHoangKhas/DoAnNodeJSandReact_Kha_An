const { conn, sql } = require('../connect');
module.exports = function () {
    this.getAll = async function (result) {
        var pool = await conn;
        var sqlStrin = "SELECT * FROM DichVu";
        return await pool.request().query(sqlStrin, function (err, data) {
            if (err) {
                result(err, null);
            } else {
                result(null, data.recordset);
            }
        });
    };

    this.create = async function (newData, result) {
        var pool = await conn;
        var sqlStrin = "INSERT INTO DichVu (TenDV, Gia) VALUES(@tendv, @gia)";

        return await pool.request()
            .input('tendv', sql.NVarChar, newData.TenDV)
            .input('gia', sql.Int, newData.Gia)
            .query(sqlStrin, function (err, data) {
                if (err) {
                    result(err, null);
                } else {
                    result(null, newData);
                }
            });
    };

    this.update = async function (newData, result) {
        var pool = await conn;
        var sqlStrin = "UPDATE DichVu SET TenDV=@tendv, Gia=@gia WHERE MADV=@madv";
        return await pool.request()
            .input('tendv', sql.NVarChar, newData.TenDV)
            .input('gia', sql.Int, newData.Gia)
            .input('madv', sql.Int, newData.MaDV)
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
        var sqlStrin = "DELETE FROM DichVu WHERE MaDV=@madv";
        return await pool.request()
            .input('madv', sql.Int, id)
            .query(sqlStrin, function (err, data) {
                if (err) {
                    result(err, null);
                } else {
                    result(null, data);
                }
            });
    };
};
