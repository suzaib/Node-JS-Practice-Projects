const jwt = require("jsonwebtoken");
const secret = "Piyush$123@$";

const setUser = (user) => {
    return jwt.sign({
        _id: user._id,
        email: user.email,
        role:user.role,
    }, secret);
}

const getUser = (token) => {
    if (!token) {
        return null;
    }
    return jwt.verify(token, secret)
}

module.exports = {
    setUser,
    getUser
}