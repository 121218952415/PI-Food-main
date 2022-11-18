const { Diets, Recipe } = require("../db");

const postCreate = async (
  name,
  summary,
  healthScore,
  analyzedInstructions,
  dietType
) => {
  // console.log("lalala", name);
  if (
    !name ||
    !summary ||
    !healthScore ||
    !analyzedInstructions
  ) {
    throw Error("inserte el dato para continuar!");
  } else {
    // Diets.findOrCreate({
    //   where: { name: e. },
    // });

    const newrecipe = await Recipe.create({
      name,
      summary,
      healthScore,
      analyzedInstructions,
      dietType,
    });

    let recipedb = await Diets.findAll({
      where: { name: dietType },
    });

    await newrecipe.addDiets(recipedb);
    return newrecipe;
  }
};

module.exports = {
  postCreate,
};
