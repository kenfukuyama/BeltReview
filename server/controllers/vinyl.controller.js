const { Vinyl } = require('../models/vinyl.model');
const mongoose = require('mongoose');

module.exports.createVinyl = (request, response) => {
    // ! you need to edit this for each Schema
    const {
        title, 
        artist, 
        description, 
        owned, 
        genres} = request.body;
    // console.log(userId.length);
    // let tempUserId = mongoose.Types.ObjectId(userId);
    // ! change this
    Vinyl.create({
        title, 
        artist, 
        description, 
        owned, 
        genres
    })
        .then(vinyl =>{ 
            response.json(vinyl);
        })
        .catch(err => response.status(400).json(err));
}

module.exports.getAllVinyls = (request, response) => {
    Vinyl.find({})
        .then(vinyls => response.json(vinyls))
        .catch(err => response.json(err))
}

module.exports.getVinyl = (request, response) => {
    Vinyl.findOne({_id:request.params.id})
        .then(vinyl => response.json(vinyl))
        .catch(err => response.json(err))
}


module.exports.updateVinyl = (request, response) => {
    Vinyl.findOneAndUpdate({_id: request.params.id}, request.body, {new:true, runValidators: true})
        .then(updatedVinyl => response.json(updatedVinyl))
        .catch(err => response.status(400).json(err))
}

module.exports.deleteVinyl = (request, response) => {
    Vinyl.deleteOne({ _id: request.params.id })
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.json(err))
}