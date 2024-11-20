const Booking = require('../Model/BookingModel');
const model = new Booking();

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

exports.delete = function(req, res) {
    model.delete(req.body.madv, function(err, data) {
        res.send({ result: data, error: err });
    });
};