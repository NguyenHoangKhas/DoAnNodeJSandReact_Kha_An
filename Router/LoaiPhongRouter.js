module.exports=function(app){
    var LoaiPhongController=require('../Contronller/LoaiPhongController')
    //goi den du lieu
    app.get('/LoaiPhong', LoaiPhongController.getList);
    //uptade table dichvu
    app.put('/LoaiPhong', LoaiPhongController.update );
    
    
    //Insert du lieu
    app.post('/LoaiPhong', LoaiPhongController.addNew);
    //xoa du lieu
    app.delete('/LoaiPhong/:maloaiphong',LoaiPhongController.delete);
}