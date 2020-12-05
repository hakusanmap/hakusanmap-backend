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

    // user_idがuserデータベースにあるのか
    try {
        user_record = await models.user.findOne({ where: { id: req.body.user_id } })

    } catch (err) {
        // uesridがデータベースにない
        return res.status(500).json({
            success: false,
            message: 'database do not have this user'
        })
    }

    // img_idがimageデータベースにあるのか
    try {
        img_record = await models.post.findOne({ where: { id: req.body.img_id } })

    } catch (err) {
        // imgidがデータベースにない
        return res.status(500).json({
            success: false,
            message: 'database do not have this image'
        })
    }

    // location_idがlocationデータベースにあるのか
    try {
        location_record = await models.location.findOne({ where: { id: req.body.location_id } })

    } catch (err) {
        // locationidがデータベースにない
        return res.status(500).json({
            success: false,
            message: 'database do not have this location'
        })
    }

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