const { Router } = require('express');
//const { Diets } = require('../db');
const {TypeDiets} = require("../controllers.js/diets")
const router = Router();

router.get('/', async (req, res, next) => {
    
    try {
        TypeDiets.forEach(e => {
            Diets.findOrCreate({
                where: { name: e}
            })
        });
        const dietTypes = await Diets.findAll();
        res.status(200).send(dietTypes)
    } catch (error) {
        res.status(404).send("la dieta no se encuentra")
    }
})
 

module.exports = router;