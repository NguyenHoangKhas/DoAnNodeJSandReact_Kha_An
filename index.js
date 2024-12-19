const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const { VarChar, Int } = require('mssql');

app.use(cors());
app.use(bodyParser.json());
//Dich Vu
require('./Router/StudentRouter')(app);
//Nhan Vien
require('./Router/NhanVien')(app)
//Loai Phong
require('./Router/LoaiPhongRouter')(app)
//Rooms
require('./Router/RoomRouter')(app)
//Customers
require('./Router/CustomersRouter')(app)
//
require('./Router/BookingRouter')(app)

require('./Router/HoaDonRouter')(app)

require('./Router/Account')(app)

// Mở cổng server
app.listen(3000, function () {
    console.log("Ứng dụng đang chạy trên cổng 3000");
});
