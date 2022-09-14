const { Pirate } = require('../models/pirate.model');
const mongoose = require('mongoose');

module.exports.createPirate = (request, response) => {
    // ! you need to edit this for each Schema
    const {
        name, 
        imgURL, 
        numChests, 
        phrase, 
        position,
        things
        } = request.body;
    // console.log(userId.length);
    // let tempUserId = mongoose.Types.ObjectId(userId);
    // ! change this
    Pirate.create({
        name, 
        imgURL, 
        numChests, 
        phrase, 
        position,
        things
    })
        .then(pirate =>{ 
            response.json(pirate);
        })
        .catch(err => response.status(400).json(err));
}

module.exports.getAllPirates = (request, response) => {
    Pirate.find({})
        .then(pirates => response.json(pirates))
        .catch(err => response.json(err))
}

module.exports.getPirate = (request, response) => {
    Pirate.findOne({_id:request.params.id})
        .then(pirate => response.json(pirate))
        .catch(err => response.json(err))
}


module.exports.updatePirate = (request, response) => {
    Pirate.findOneAndUpdate({_id: request.params.id}, request.body, {new:true, runValidators: true})
        .then(updatedPirate => response.json(updatedPirate))
        .catch(err => response.status(400).json(err))
}

module.exports.deletePirate = (request, response) => {
    Pirate.deleteOne({ _id: request.params.id })
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.json(err))
}