const { Router } = require("express");
// const { Recipe, Diets } = require("../db");
const router = Router();
const { postCreate } = require("../controllers.js/Post");

router.post("/", async (req, res) => {
  
  const {
    name, 
    summary,
    healthScore,
    analyzedInstructions,
    dietTypes
  } = req.body; 
  // console.log(name) 
  // console.log(req.body)
  try {
    
    const newrecipe = await postCreate(
      name,
      summary,
      healthScore,
      analyzedInstructions,
      dietTypes
    );
    res.status(200).send(newrecipe);
  }
  catch (error) { 
    // console.log("la receta no se pudo crear :",error) 
    res.status(404).send(error.message);
 }
});

module.exports = router;
