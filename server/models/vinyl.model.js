const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const VinylSchema = new mongoose.Schema({
    title: { type: String,
        required: [true, "album name is required"],
        minlength: [3, "album name must be at least 3 characters"],
        unique : "the title needs to be unique"
    },
    artist: { type: String,
        required: [true, "artist name is required"],
        minlength: [3, "album name must be at least 3 characters"]
    },
    description: { type: String,
        required: [true, "Description is required"],
        minlength: [3, "Description must be at least 3 characters"]
    },
    owned: { 
        type: String,
        default : false
    },
    genres : {
        type: mongoose.Schema.Types.Mixed, 
        default: ["", "", ""]
    }
}, { timestamps: true });

VinylSchema.plugin(uniqueValidator);
module.exports.Vinyl = mongoose.model('Vinyl', VinylSchema);

