const Customers = require('../Model/CustomersModel');
const model = new Customers();

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
    const customerId = req.params.customerid; // Lấy customerid từ URL
    model.delete(customerId, function(err, data) {
        res.send({ result: data, error: err });
    });
};
