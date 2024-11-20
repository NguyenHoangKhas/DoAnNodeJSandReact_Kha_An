const { conn, sql } = require('../connect');
module.exports = function() {
    this.getAll = async function(result) {
        var pool = await conn;
        var sqlStrin = "SELECT * FROM Bookings";
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
        var sqlStrin = "INSERT INTO Bookings (CustomerID, RoomID, CheckInDate, CheckOutDate, TotalPrice) VALUES(@customerid, @roomid, @checkindate, @checkoutdate, @totalprice)";
        
        return await pool.request()
            .input('customerid', sql.Int, newData.customerid)
            .input('roomid', sql.Int, newData.roomid)
            .input('checkindate', sql.Date, newData.checkindate)
            .input('checkoutdate', sql.Date, newData.checkoutdate)
            .input('totalprice', sql.Decimal, newData.totalprice)
            
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
        var sqlStrin = "UPDATE Bookings SET CustomerID=@customerid, RoomID=@roomid, CheckInDate=@checkindate, CheckOutDate=@checkoutdate, TotalPrice=@totalprice WHERE BookingID=@bookingid";
        return await pool.request()
            .input('customerid', sql.Int, newData.customerid)
            .input('roomid', sql.Int, newData.roomid)
            .input('checkindate', sql.Date, newData.checkindate)
            .input('checkoutdate', sql.Date, newData.checkoutdate)
            .input('totalprice', sql.Decimal, newData.totalprice)
            .input('bookingid', sql.Int, newData.bookingid)
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
        var sqlStrin = "DELETE FROM Bookings WHERE BookingID=@bookingid";
        return await pool.request()
            .input('bookingid', sql.Int, id)
            .query(sqlStrin, function(err, data) {
                if (err) {
                    result(err, null); 
                } else {
                    result(null, data); 
                }
            });
    };
};