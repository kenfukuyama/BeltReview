const mongoose = require('mongoose');

const PirateSchema = new mongoose.Schema({
    name: { type: String,
        required: [true, "pirate name is required"],
    },
    imgURL: { type: String,
        required: [true, "image URL is required"],
    },
    numChests: { type: Number,
        required: [true, "number of treasure chests is required"]
    },
    phrase : { 
        type: String,
        required: [true, "catch phrase is required"]
    },
    position : {
        type: String,
        required: [true, "crew position is required"]
        // some validation for unique captian
    },
    things : {
        type :  mongoose.Schema.Types.Mixed,
        default : [true, true, true] // peg leg, eye patch, hook hand
    }
}, { timestamps: true });

module.exports.Pirate = mongoose.model('Pirate', PirateSchema);

