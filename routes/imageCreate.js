const models = require('../models/index')
const bcrypt = require('bcrypt')
const emailValidator = require("email-validator")

module.exports = async (req, res) => {


    // 全てのフィールドがあるか確認
    if (
        !req.body.name     
    ) {
        return res.status(400).json({
            success: false,
            message: 'wrong input field.'
        })
    }

    // 名前の長さで弾く
    if ( req.body.name.length > 100 ) {
        return res.status(400).json({
            success: false,
            message: 'name is too long.'
        })
    }

    let record = null
    const userName = req.body.name

    try {
        await models.image.create({
            name: userName
        })
        return res.json({
            success: true,
            message: 'database registration completed.'
        })
    } catch ( err ) {
        return res.status(500).json({
            success: false,
            message: 'database is corrupted.'
        })
    }

}