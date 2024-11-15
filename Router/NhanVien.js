
module.exports=function(app){
    var NhanVienController=require('../Contronller/NhanVienControllerr')
    //goi den du lieu
    app.get('/nhanvien', NhanVienController.getList);
    //uptade table dichvu
    app.put('/nhanvien', NhanVienController.update );
    
    
    //Insert du lieu
    app.post('/nhanvien', NhanVienController.addNew);
    //xoa du lieu
    app.delete('/nhanvien/:nhanvienid',NhanVienController.delete);
}