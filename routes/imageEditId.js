const models = require('../models/index')
const bcrypt = require('bcrypt')
const emailValidator = require("email-validator")

module.exports = async (req, res) => {

    let param = {}

    if ( !!req.body.name ) {
        // 名前の長さで弾く
        if ( req.body.name.length > 100 ) {
            return res.status(400).json({
                success: false,
                message: 'name is too long.'
            })
        }
        param['name'] = req.body.name
    }


    try {
        await models.image.update(param, { where: { id: req.params.id } })
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