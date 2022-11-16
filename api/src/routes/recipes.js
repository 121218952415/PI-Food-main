const { Router } = require("express");
const router = Router();
const { Recipe, Diets } = require("../db"); // tratigo  los modelos de db
const axios = require("axios"); // para convertir de joson a opjeto
const { getApiById, getApiInfo } = require("../controllers.js/getRecipes");
const server = require("../app");

// empesamos las rutas
router.get("/", async (req, res) => {
  //   console.log(recipes);
  try {
    const { name } = req.query; // si el parametro viene por query
    let allrecipes = await getApiInfo(); // alojo toda la info de mi api externa
    if (name) {
      // si viene por name
      let recipeByQuery = allrecipes.filter(
        (
          e // filtro lo que viene por query
        ) => e.name.toLowerCase().includes(name.toLowerCase()) // las hago igual , minusculas y pregunto
      );
      if (recipeByQuery.length) {
        res.status(200).send(recipeByQuery);
      }
      res.status(404).send("¡el platillo que esta buscando no existe!");
    } else {
      res.status(200).send(allrecipes);
    }
  } catch (error) {
    res.status(404).send("platillo no encontrado");
  }
});
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let apiRecipesById = await getApiById(id);
    if (apiRecipesById.data.id) {
      let recipeDetails = {
        image: apiRecipesById.data.image,
        name: apiRecipesById.data.title,
        dishTypes: apiRecipesById.data.dishTypes,
        dietTypes: apiRecipesById.data.diets,
        summary: apiRecipesById.data.summary,
        score: apiRecipesById.data.spoonacularScore,
        healthScore: apiRecipesById.data.healthScore,
        steps: apiRecipesById.data.analyzedInstructions[0]?.steps.map((e) => {
          return {
            number: e.number,
            step: e.step,
          };
        }),
      };
      return res.status(200).send(recipeDetails);
    }
  } catch (error) {
    res.status(404).send(`no se encuentra id ${id}`);
  }
});

module.exports = router;
