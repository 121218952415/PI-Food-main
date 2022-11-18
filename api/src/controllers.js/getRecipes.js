const { Sequelize } = require("sequelize");
const axios = require("axios");
const { API_KEY } = process.env;
const { Diets, Recipe } = require("../db");

const getApiInfo = async () => {
  const apiurl = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true`
  );
  const apinfo = await apiurl.data.results.map((e) => {
    let info = {
      id: e.id,
      name: e.title,
      img: e.image,
      Diets: e.diets.map((d) => {
        return { name: d };
      }), // un array con los tipos de dieta de esa receta
      // dishTypes: e.dishTypes.map((d) => {
      //   return { name: d };
      // }),  tipo de plato y un arreay de tipos de  platos
      summary: e.summary, // un resumen del plato
      healthScore: e.healthScore, // que tan saludable es
      analyzedInstructions: e.analyzedInstructions[0]?.steps.map(e => {
        return {
            number: e.number,
            step: e.step
        }
    }) // el paso a paso de como se hace
    };
    return info;
  });
  //console.log(apinfo);
  // console.log(apiurl.data.results);
  return apinfo; //Promise.all(apinfo)
};
const getDBInfo = async () => {
  return await Recipe.findAll({
    include: {
      model: Diets,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};
const getDbById = async (id) => {
  return await Recipe.findByPk(id, {
      include: {
          model: Diets,
          attributes: ['name'],
          through: {
              attributes: [],
          }
      }
  });
}

const getApiById = async (id) => {
  return await axios.get (`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)
}

// getallinfo es para traer toda la info 
const getuniapis = async () => {
  let apiinfo = await getApiInfo();
  let dbinfo  = await getDBInfo();
  let infototal = apiinfo.concat(dbinfo);
  return  infototal;
};

module.exports = {
  getApiInfo ,
  getDBInfo,
  getuniapis,
  getApiById,
  getDbById
};