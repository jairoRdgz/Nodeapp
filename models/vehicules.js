const mongoose = require('mongoose')

const Schema = mongoose.Schema

let VehiculeSchema = Schema ({
    type: {type: String,  required: true, max: 100},
    brand: {type: String, required: true},
    model: {type: String, required: true, max: 100,},
    year: {type: String,  required: true, max: 100},
    plate: {type: String,  required: true, max: 100},
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

module.exports = mongoose.model('Vehicule', VehiculeSchema)