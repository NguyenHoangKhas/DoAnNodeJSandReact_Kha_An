module.exports = function (app) {
    var accountController = require('../Contronller/AccountController')
    app.post('/register', accountController.postRegister);
    app.post('/login', accountController.postLogin);
}