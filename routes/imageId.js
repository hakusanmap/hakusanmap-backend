const models = require('../models/index')

module.exports = async (req, res) => {

    let record = null
    try {
        record　= await models.image.findOne({ where: { id: req.params.id } })
        
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
        name: record.name
    }

    return res.status(200).json({
        success: true,
        record: record
    })
}