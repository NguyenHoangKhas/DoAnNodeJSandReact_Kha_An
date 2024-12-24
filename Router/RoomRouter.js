module.exports = function (app) {
    var RoomController = require('../Contronller/RoomController')
    //goi den du lieu
    app.get('/room', RoomController.getList);
    //uptade table dichvu
    app.put('/room', RoomController.update);


    //Insert du lieu
    app.post('/room', RoomController.addNew);
    //xoa du lieu
    app.delete('/room/:roomid', RoomController.delete);
}