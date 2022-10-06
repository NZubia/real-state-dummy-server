const mongoose = require("mongoose");

const HouseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    houseType: {
        type: String,
        required: true,
        default: "RENT"// OR SALE
    },
    buildingType : {
        type: String,
        required: true,
        default: "HOUSE" // OR DEPARTMENT
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    location: {
        type: { type: String },
        coordinates: []
    },
    ownerName: {
        type: String,
        required: true
    },
    ownerPhone: {
        type: String,
        required: true
    },
    favourite: {
        type: Boolean,
        default: false
    }
});

HouseSchema.index({ "location": "2dsphere" });

const House = mongoose.model('House', HouseSchema);

module.exports = {
    House
};
