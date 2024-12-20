module.exports = function (app) {
    var LoaiPhongController = require('../Contronller/LoaiPhongController')
    //goi den du lieu
    app.get('/loaiphong', LoaiPhongController.getList);
    //uptade table dichvu
    app.put('/loaiphong', LoaiPhongController.update);


    //Insert du lieu
    app.post('/loaiphong', LoaiPhongController.addNew);
    //xoa du lieu
    app.delete('/loaiphong/:maloaiphong', LoaiPhongController.delete);
}