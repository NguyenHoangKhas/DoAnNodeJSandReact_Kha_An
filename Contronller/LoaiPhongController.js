const LoaiPhong = require('../Model/LoaiPhongModel');
const model = new LoaiPhong();

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
    const maLP = req.params.maloaiphong;
    model.delete(maLP, function (err, data) {
        res.send({ result: data, error: err });
    });
};