const JWT = require("jsonwebtoken")
const secret = "$uperMan@123"

function generateTokenForUser(user) {
    const payload = {
        _id: user._id,
        email: user.email,
        profileImgURL: user.profileImgURL,
        role: user.role
    }
    const token = JWT.sign(payload, secret)
    return token
}


function validateToken(token) {
    const payload = JWT.verify(token)
    return payload
}

module.exports = {
    generateTokenForUser,
    validateToken
}