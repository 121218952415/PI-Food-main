const { Diets, Recipe } = require("../db");
const  TypeDiets  = require("../controllers.js/diets")

const postCreate = async (name, summary,spoonacularScore,healthScore,analyzedInstructions,TypeDiets) => {
  if (!name ||!summary || !spoonacularScore || !healthScore || !analyzedInstructions){
    throw Error("inserte el dato para continuar!");
  }else{ 
    const newrecipe =  await Recipe.create({
    name,
    summary,
    spoonacularScore,
    healthScore,
    analyzedInstructions,
    TypeDiets
    }) 

    let recipedb = await Diets.findAll({
        where: { name: TypeDiets }
    })   


     await newrecipe.addDiets(recipedb)
     return newrecipe
  }
};



module.exports = {
    postCreate
}