// const { json } = require('body-parser');
const { Router } = require('express');
const recipes  = require('./recipes')
const recipe = require('./recipe')
const typed = require('./typed')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
//router.use(express.json())
router.use("/recipes",recipes); // recetas 
 router.use ("/recipe",recipe)  //buscar por por id 
 router.use ("/typed",typed)// tipo de dieta 

// http:/localhos:3001/recipes ruta sea /recipes  es ruta home 
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
