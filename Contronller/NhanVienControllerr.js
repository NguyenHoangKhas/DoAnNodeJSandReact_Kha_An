const NhanVien = require('../Model/NhanVienModel');
const model = new NhanVien();

exports.getList = function(req, res) {
    model.getAll(function(err, data) {
        res.send({ result: data, error: err });
    });
};

exports.addNew = function(req, res) {
    model.create(req.body, function(err, data) {
        res.send({ result: data, error: err });
    });
};

exports.update = function(req, res) {
    model.update(req.body, function(err, data) {
        res.send({ result: data, error: err });
    });
};

exports.delete = function (req, res) {
    model.delete(req.params.nhanvienid, function (err, data) {
        res.send({ result: data, error: err });
    });
};
