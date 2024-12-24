const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');
const auth = require('./config/authMiddleWare');

const app = express();

// Cấu hình multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Đường dẫn lưu file: Thư mục Image trong client
        cb(null, path.join(__dirname, 'Client', 'clientt', 'public', 'Image'));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    },
});

const upload = multer({ storage });

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/Image', express.static(path.join(__dirname, 'Client', 'clientt', 'public', 'Image'))); // Middleware để phục vụ file tĩnh
app.all('*', auth);

// Import các Router
require('./Router/StudentRouter')(app);
require('./Router/NhanVien')(app);
require('./Router/LoaiPhongRouter')(app);
require('./Router/RoomRouter')(app);
require('./Router/CustomersRouter')(app);
require('./Router/BookingRouter')(app);
require('./Router/HoaDonRouter')(app);
require('./Router/Account')(app);

// API upload ảnh
app.post('/upload-image', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'Không có file nào được tải lên' });
    }
    const imageUrl = `/Image/${req.file.filename}`; // URL của ảnh trong thư mục public
    res.json({ message: 'Ảnh đã được tải lên thành công', imageUrl });
});
// Mở cổng server
app.listen(3000, function () {
    console.log("Ứng dụng đang chạy trên cổng 3000");
});
