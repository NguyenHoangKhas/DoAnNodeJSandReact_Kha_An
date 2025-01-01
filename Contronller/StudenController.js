const student = require('../Model/StudentModel');
const model = new student();

exports.getList = async function (req, res) {
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
    model.delete(req.params.madv, function (err, data) {
        res.send({ result: data, error: err });
    });
};