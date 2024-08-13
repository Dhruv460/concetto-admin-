require('dotenv').config()
const admins = ["66b99c154f9d852820da8339", "66b99c764f9d852820da8341"]
const checkAdmin = (req, res, next) => {
    if (!admins.find((id) => req.user._id.equals(id))) {
        res.status(403).send({ error: "User is not admin" })
        return;
    }
    next()
}

module.exports = { checkAdmin }
