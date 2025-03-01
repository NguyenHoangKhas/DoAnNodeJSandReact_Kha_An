const { conn, sql } = require('../connect');
module.exports = function() {
    this.getAll = async function(result) {
        var pool = await conn;
        var sqlStrin = "SELECT * FROM Rooms";
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
        var sqlStrin = "INSERT INTO Rooms (RoomNumber, RoomType, PricePerNight, Availability, LoaiPhongID, ImageUrl) VALUES(@roomnumber, @roomtype, @pricepernight, @availability, @loaiphongid, @imageurl)";
        
        return await pool.request()
            .input('roomnumber', sql.VarChar, newData.roomnumber)
            .input('roomtype', sql.VarChar, newData.roomtype)
            .input('pricepernight', sql.Decimal, newData.pricepernight)
            .input('availability', sql.Bit, newData.availability)
            .input('loaiphongid', sql.Int, newData.loaiphongid)
            .input('imageurl', sql.VarChar, newData.imageurl)
            
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
        var sqlStrin = "UPDATE Rooms SET RoomNumber=@roomnumber, RoomType=@roomtype, PricePerNight=@pricepernight, Availability=@availability, LoaiPhongID=@loaiphongid, ImageUrl=@imageurl WHERE RoomID=@roomid";
        return await pool.request()
            .input('roomnumber', sql.VarChar, newData.roomnumber)
            .input('roomtype', sql.VarChar, newData.roomtype)
            .input('pricepernight', sql.Decimal, newData.pricepernight)
            .input('availability', sql.Bit, newData.availability)
            .input('loaiphongid', sql.Int, newData.loaiphongid)
            .input('imageurl', sql.VarChar, newData.imageurl)
            .input('roomid', sql.Int, newData.roomid)
            .query(sqlStrin, function(err, data) {
                if (err) {
                    result(err, null); 
                } else {
                    result(null, newData); 
                }
            });
    };

    this.delete = async function(id) {
        try {
            const pool = await conn;
            const sqlString = "DELETE FROM Rooms WHERE RoomID=@roomid";
            const result = await pool.request()
                .input('roomid', sql.Int, id)
                .query(sqlString);
            return result;
        } catch (err) {
            throw err;  // Nếu có lỗi, ném lỗi ra ngoài
        }
    };
    

    this.searchByPrice = async function(minPrice, maxPrice, result) {
        var pool = await conn;
        var sqlStrin = "SELECT * FROM Rooms WHERE PricePerNight BETWEEN @minPrice AND @maxPrice";
        return await pool.request()
            .input('minPrice', sql.Decimal, minPrice)
            .input('maxPrice', sql.Decimal, maxPrice)
            .query(sqlStrin, function(err, data) {
                if (err) {
                    result(err, null);
                } else {
                    result(null, data.recordset);
                }
            });
    };
    
};