const models = require('../models/index')

module.exports = async (req, res) => {

    try {
        // データベースにemialがあるか検出
        await models.user.destroy({ where: { id: req.params.id } })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'database is corrupted.'
        })
    }

    return res.status(200).json({
        success: true,
        message: 'delete complete.'
    })
    
}