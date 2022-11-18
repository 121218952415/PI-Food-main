const { Router } = require("express");
const { Diets } = require("../db");
const { TypeDiets } = require("../controllers.js/diets");
const router = Router();

router.get("/", async (req, res) => {
  try {
    TypeDiets.forEach((e) => {
      Diets.findOrCreate({
        where: { name: e.name },
      });
    });
    const dietTypes = await Diets.findAll();
    res.status(200).send(dietTypes);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = router;
