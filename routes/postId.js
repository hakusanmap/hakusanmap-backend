const models = require('../models/index')

module.exports = async (req, res) => {

    let record = null
    try {
        record　= await models.post.findOne({ where: { id: req.params.id } })
        
    } catch (err) {
        // データベースの故障
        return res.status(500).json({
            success: false,
            message: 'database is corrupted.'
        })
    }

    // 必要なデータのみ抽出
    record = {
        id: record.id,
        name: record.name,
        user_id: record.user_id,
        type: record.type,
        img_id: record.img_id,
        location_id: record.location_id
    }

    return res.status(200).json({
        success: true,
        record: record
    })
}