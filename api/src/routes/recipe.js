const { Router } = require("express");
const { Recipe, Diets } = require("../db");
const router = Router();
const { postCreate } = require("../controllers.js/Post");

router.post("/", async (req, res) => {
    
  const {
    name,
    summary,
    spoonacularScore,
    healthScore,
    analyzedInstructions,
    dietTypes
  } = req.body; 
            
  try {
    const newrecipe = await postCreate(
      name,
      summary,
      spoonacularScore,
      healthScore,
      analyzedInstructions,
      dietTypes
    );
    res.status(200).send("receta creada ");
  }
  catch (error) {
    res.status(404).send("la receta no se pudo crear");
 }
});

module.exports = router;
