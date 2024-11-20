module.exports=function(app){
    var BookingController=require('../Contronller/BookingController')
    //goi den du lieu
    app.get('/booking', BookingController.getList);
    //uptade table dichvu
    app.put('/booking', BookingController.update );
    
    
    //Insert du lieu
    app.post('/booking', BookingController.addNew);
    //xoa du lieu
    app.delete('/booking/:bookingid',BookingController.delete);
}