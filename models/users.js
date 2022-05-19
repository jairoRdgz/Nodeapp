const { number } = require('joi')
const mongoose = require('mongoose')

const Schema = mongoose.Schema

let UserSchema = Schema ({
    name: {type: String,  required: true, max: 100},
    lastname: {type: String,  required: true, max: 100},
    username: {type: String,  required: true, min: 8,max: 100},
    identification: {type: String,  required: true, max: 100},
    password: {type: String,  required: true, max: 100},
    active: {type: String,  required: true, max: 100},
    token: {type: String,  required: false, max: 100},
    vehicules: [
        { type: Schema.Types.ObjectId, ref: 'Vehicule' }
      ]
})

module.exports = mongoose.model('User', UserSchema)