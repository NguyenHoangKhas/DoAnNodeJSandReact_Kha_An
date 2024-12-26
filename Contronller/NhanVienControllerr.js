const NhanVien = require('../Model/NhanVienModel');
const HoaDon = require('../Model/HoaDonModel');
const model = new NhanVien();
const modelHoaDon = new HoaDon();

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
    const nhanVienID = req.params.nhanvienid;

    // Step 1: Delete related HoaDon entries
    modelHoaDon.deleteHoaDonchoNhanVien(nhanVienID, function (errHoaDon, dataHoaDon) {
        if (errHoaDon) {
            console.error(`Error deleting HoaDon for NhanVien ID ${nhanVienID}:`, errHoaDon);
            return res.status(500).send({ result: null, error: errHoaDon });
        }

        console.log(`Deleted HoaDon for NhanVien ID ${nhanVienID}:`, dataHoaDon);

        // Step 2: Delete the NhanVien entry
        model.delete(nhanVienID, function (errNhanVien, dataNhanVien) {
            if (errNhanVien) {
                console.error(`Error deleting NhanVien ID ${nhanVienID}:`, errNhanVien);
                return res.status(500).send({ result: null, error: errNhanVien });
            }

            console.log(`Deleted NhanVien ID ${nhanVienID}:`, dataNhanVien);

            // Send a single response after both operations
            res.send({ result: { hoaDon: dataHoaDon, nhanVien: dataNhanVien }, error: null });
        });
    });
};
