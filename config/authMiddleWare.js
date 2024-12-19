const jwt = require('jsonwebtoken');
require('dotenv').config();

function auth(req, res, next) {
    const white_list = ["/", "/account/register", "/account/login",];
    console.log("!!!!!" + req.originalUrl)
    if (white_list.find(item => item === req.originalUrl)) {
        next();
    } else {
        if (req?.headers?.authorization?.split(' ')?.[1]) {
            const token = req.headers.authorization.split(' ')[1];
            console.log(">>>Check Token: " + token)
            // Verify
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET,)
                console.log(">>>Check Token: " + decoded)
            } catch (error) {
                return res.status(401).json({
                    message: "Token bị hết hạn/Hoặc không hợp lệ"
                })
            }
            next();
        } else {
            // return exception
            return res.status(401).json({
                message: "Bạn chưa truyền Access Token Header/Hoặc Token bị hết hạn"
            })
        }
    }
}

module.exports = auth;