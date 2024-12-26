const auth = require('../config/authMiddleWare');

module.exports = function (app) {
    var CustomersController = require('../Contronller/CustomersController')
    //goi den du lieu
    app.get('/customer', CustomersController.getList);
    //uptade table dichvu
    app.put('/customer', CustomersController.update);


    //Insert du lieu
    app.post('/customer', CustomersController.addNew);
    //xoa du lieu
    app.delete('/customer/:customerID', CustomersController.delete);
}