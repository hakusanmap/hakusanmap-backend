const models = require('../models/index')
const bcrypt = require('bcrypt')
const emailValidator = require("email-validator")

module.exports = async (req, res) => {

    try {
        await models.post.update(param, { where: { id: req.params.id } })
        return res.json({
            success: true,
            message: 'database change completed.'
        })
    } catch ( err ) {
        return res.status(500).json({
            success: false,
            message: 'database is corrupted.'
        })
    }
}