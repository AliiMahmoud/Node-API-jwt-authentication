// requiring the person model
const personModel = require('../models/track')


module.exports.createTrack = async function (req, res) {

    let track = {}

    let response = await personModel.insertTrack(track); // bool
    
    if (response === true) {
        res.status(201).json({
            success: true,
            message: 'New Track is Created Successfully',
            track: track,
        });
    }
    else {
        res.status(500).json({ status: 500, success: false, error: response });
    }
}
