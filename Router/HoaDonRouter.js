module.exports = function (app) {
    var HoaDonController = require('../Contronller/HoaDonController')
    //goi den du lieu
    app.get('/hoadon', HoaDonController.getList);
    //uptade table dichvu
    app.put('/hoadon', HoaDonController.update);


    //Insert du lieu
    app.post('/hoadon', HoaDonController.addNew);
    //xoa du lieu
    app.delete('/hoadon/:mahd', HoaDonController.delete);
    //thanh toan

    app.get('/hoadon/total/day/:ngay', HoaDonController.getTotalByDay);

    // Tính tổng tiền theo tuần
    app.get('/hoadon/total/week/:tuan/:nam', HoaDonController.getTotalByWeek);

    // Tính tổng tiền theo tháng
    app.get('/hoadon/total/month/:thang/:nam', HoaDonController.getTotalByMonth);
}