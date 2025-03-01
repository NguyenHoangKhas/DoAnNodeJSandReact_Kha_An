const Booking = require('../Model/BookingModel');
const model = new Booking();

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
    console.log(">>>NEW DATA: ", req.body)
    model.update(req.body, function (err, data) {
        res.send({ result: data, error: err });
    });
};

exports.delete = function (req, res) {
    const bookingID = req.params.bookingid
    model.delete(bookingID, function (err, data) {
        res.send({ result: data, error: err });
    });
};