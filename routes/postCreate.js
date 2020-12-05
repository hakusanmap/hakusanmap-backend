const models = require('../models/index')
const bcrypt = require('bcrypt')
const emailValidator = require("email-validator")

module.exports = async (req, res) => {


    // 全てのフィールドがあるか確認
    if (
        !req.body.name      ||
        !req.body.user_id   ||
        !req.body.type      ||
        !req.body.img_id    ||
        !req.body.location_id
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

    let record = null
    const postName = req.body.name
    const userId = req.body.user_id
    const type = req.body.type
    const imgId = req.body.img_id
    const locationId = req.body.location_id

    try {
        await models.post.create({
            name: postName,
            user_id: userId,
            type: type,
            img_id: imgId,
            location_id: locationId
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