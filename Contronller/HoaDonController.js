const HoaDon = require('../Model/HoaDonModel');
const model = new HoaDon();

exports.getList = function (req, res) {
    model.getAll(function (err, data) {
        res.send({ result: data, error: err });
    });
};

exports.addNew = function (req, res) {
    model.create(req.body, function (err, data) {
        res.send({ result: data, error: err });
    });
};

exports.update = function (req, res) {
    model.update(req.body, function (err, data) {
        res.send({ result: data, error: err });
    });
};

exports.delete = function (req, res) {
    const { mahd } = req.params; // Lấy MaHD từ params
    model.delete(mahd, function (err, data) {
        if (err) {
            res.status(500).send({ result: null, error: err });
        } else {
            res.send({ result: data, error: null });
        }
    });
};

//thanh toan 
// HoaDonController.js
//tinh tien
exports.getTotalByDay = function (req, res) {
    const { ngay } = req.params; // Lấy ngày từ URL
    model.getTotalByDay(ngay, function (err, data) {
        if (err) {
            res.status(500).send({ result: null, error: err });
        } else {
            res.send({ result: data, error: null });
        }
    });
};

exports.getTotalByWeek = function (req, res) {
    const { tuan, nam } = req.params; // Lấy tuần và năm từ URL
    model.getTotalByWeek(tuan, nam, function (err, data) {
        if (err) {
            res.status(500).send({ result: null, error: err });
        } else {
            res.send({ result: data, error: null });
        }
    });
};

exports.getTotalByMonth = function (req, res) {
    const { thang, nam } = req.params; // Lấy tháng và năm từ URL
    model.getTotalByMonth(thang, nam, function (err, data) {
        if (err) {
            res.status(500).send({ result: null, error: err });
        } else {
            res.send({ result: data, error: null });
        }
    });
};
