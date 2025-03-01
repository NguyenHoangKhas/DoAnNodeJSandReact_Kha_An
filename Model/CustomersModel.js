const { conn, sql } = require('../connect');
module.exports = function () {
    this.getAll = async function (result) {
        var pool = await conn;
        var sqlStrin = "SELECT * FROM Customers";
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
        console.log(">>>Server NewData: ", newData)
        var pool = await conn;
        var sqlStrin = "INSERT INTO Customers (FirstName, LastName, Email, Phone, UserID) VALUES(@firstName, @lastName, @email, @phone, @userid)";

        return await pool.request()
            .input('firstName', sql.NVarChar, newData.FirstName)
            .input('lastName', sql.NVarChar, newData.LastName)
            .input('email', sql.VarChar, newData.Email)
            .input('phone', sql.VarChar, newData.Phone)
            .input('userid', sql.Int, newData.UserID)

            .query(sqlStrin, function (err, data) {
                if (err) {
                    result(console.log(err), null);
                } else {
                    result(null, newData);
                }
            });
    };

    this.update = async function (newData, result) {
        console.log(">>>NEWDATA: ", newData);
        var pool = await conn;
        var sqlStrin = "UPDATE Customers SET FirstName=@firstName, LastName=@lastName, Email=@email, Phone=@phone, UserID=@userid WHERE CustomerID=@customerid";
        return await pool.request()
            .input('firstName', sql.NVarChar, newData.firstName)
            .input('lastName', sql.NVarChar, newData.lastName)
            .input('email', sql.VarChar, newData.email)
            .input('phone', sql.VarChar, newData.phone)
            .input('userid', sql.Int, newData.userId)
            .input('customerid', sql.Int, newData.customerid)
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
        var sqlStrin = "DELETE FROM Customers WHERE CustomerID=@customerid";
        return await pool.request()
            .input('customerid', sql.Int, id)
            .query(sqlStrin, function (err, data) {
                if (err) {
                    result(err, null);
                } else {
                    result(null, data);
                }
            });
    };
};