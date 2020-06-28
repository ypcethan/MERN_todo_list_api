const User = require('../models/User')
exports.postRegister = async (req, res, next) => {
    try {
        const user = await User.create(req.body)
        res.status(200).json(user)
    } catch (error) {
        console.error(error)
        res.status(400).json({ msg: "Some error occured" })
    }
}

exports.postLogin = (req, res, next) => {
    res.json('Post login')
}