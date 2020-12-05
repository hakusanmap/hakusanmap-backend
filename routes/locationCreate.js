const models = require('../models/index')
const bcrypt = require('bcrypt')
const emailValidator = require("email-validator")

module.exports = async (req, res) => {


    // 全てのフィールドがあるか確認
    if (
        !req.body.latitude      ||
        !req.body.longitude
    ) {
        return res.status(400).json({
            success: false,
            message: 'wrong input field.'
        })
    }

    
    let record = null
    const latitude = req.body.latitude
    const longitude = req.body.longitude

    try {
        await models.post.create({
            latitude: latitude,
            longitude: longitude
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