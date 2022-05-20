var express = require('express');
var router = express.Router();
const VehiculeController  = require("../controllers/vehicules")
const schemas = require("../models/schemas")
const validate = require("../middleware/validate")
const auth = require("../middleware/auth");  

/* vehicles listing. */
router.post('/vehiclesAdd',auth, validate(schemas.vehicule), VehiculeController.create);
router.get('/vehicles', auth, VehiculeController.index);
router.get('/:id', auth, VehiculeController.show);
router.put('/:id', auth, VehiculeController.update);
router.delete('/:id', auth, VehiculeController.delete);

module.exports = router