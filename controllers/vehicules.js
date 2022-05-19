const Vehicule = require('../models/vehicules')
const User = require("../models/users")

exports.create = async (req, res)=> {
    let vehicule = new Vehicule ({
        brand: req.body.brand,
        type: req.body.type,
        model: req.body.model,
        year: req.body.year,
        plate: req.body.plate,
        owner: req.body.owner
    })

    vehicule.save (err => {
        if (err)
            return next(err)
        res.send({status: "OK", message: "Vehicule created succesfully"})
    })

    const owner = await User.findById({_id: vehicule.owner})
    owner.vehicules.push(vehicule)
    await owner.save()
}

exports.index = (req, res, next) => {
    Vehicule.find({}, (err, vehicules)=>{
        if (err)
            return next(err) 
        res.send(vehicules)       
    } )
}

exports.show = (req, res, next) => {
    // Vehicule.findById(req.params.id, (err, Vehicule) => {
    //     if (err)
    //         return next(err) 
    //     res.send(Vehicule)
    // } )
    Vehicule.findById(req.params.id)
         .then(vehicule => {
             if(vehicule == null){
                 res.status(404).send({error: "Vehicule not found"})
             }else{
                 res.send(vehicule)
             }
         }).catch (error => {
             res.status(500).send({error: error.message})
         })
}

exports.update = (req, res, next) => {
    Vehicule.findByIdAndUpdate(req.params.id, {$set: req.body}, (err)=>{
        if (err)
            return next(err) 
        res.send({status: "OK", message: "Vehicule updated succesfully"})
    } )
}

exports.delete = (req, res, next) => {
    Vehicule.findByIdAndRemove(req.params.id,(err)=>{
        if (err)
            return next(err) 
        res.send({status: "OK", message: "Vehicule deleted succesfully"})
    })
}