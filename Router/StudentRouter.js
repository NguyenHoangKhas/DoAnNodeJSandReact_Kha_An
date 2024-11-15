
module.exports=function(app){
    var studentController=require('../Contronller/StudenController')
    //goi den du lieu
    app.get('/student', studentController.getList);
    //uptade table dichvu
    app.put('/student', studentController.update );
    
    
    //Insert du lieu
    app.post('/student', studentController.addNew);
    //xoa du lieu
    app.delete('/student/:madv',studentController.delete);
}