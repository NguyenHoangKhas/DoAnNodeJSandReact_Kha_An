const Customers = require('../Model/CustomersModel');
const model = new Customers();
const Bookings = require('../Model/BookingModel');
const modelBooking = new Bookings();
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

exports.delete = async function (req, res) {
    const customerId = req.params.customerID;
    console.log(">>>CUSTOMERID NODEJS: ", customerId);

    try {
        // Thực hiện xóa trong modelBooking
        const bookingResult = await new Promise((resolve, reject) => {
            modelBooking.delete(customerId, (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });

        // Thực hiện xóa trong model
        const customerResult = await new Promise((resolve, reject) => {
            model.delete(customerId, (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });

        // Trả về kết quả sau khi xóa cả hai
        res.send({
            result: { bookingResult, customerResult },
            error: null
        });

    } catch (err) {
        console.error("Error during deletion:", err);
        res.status(500).send({ result: null, error: err });
    }
};

