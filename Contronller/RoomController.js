const Room = require('../Model/RoomModel');
const model = new Room();

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
    model.delete(req.params.roomid, function(err, data) {
        res.send({ result: data, error: err });
    });
};
exports.searchByPrice = function(req, res) {
    model.searchByPrice(req.query.minPrice, req.query.maxPrice, function(err, data) {
        res.send({ result: data, error: err });
    });
};
