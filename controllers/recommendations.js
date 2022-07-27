const Joi = require("joi");
const { getRecommendation } = require("../db/getRecommendation");
const { generateErrors } = require("../auxOps/helpers");

const schemaCategoria = Joi.string().min(1).max(50).required();
const schemaLocation = Joi.string().min(1).max(50).required();

const searchRecommendationController = async (req, res, next) => {
  try {
    const { lugar, categoria } = req.body;

    const validatSearchecategory = schemaCategoria.validate(categoria);
    const validateSearchLocation = schemaLocation.validate(lugar);

    if (validatSearchecategory.error || validateSearchLocation) {
      throw generateErrors("Algunos de los campos están vacíos.", 400);
    }

    return res.send({
      status: "ok",
      data: "search",
    });
  } catch (error) {
    next(error);
  }
};

const getRecommendationController = async (req, res, next) => {
  const { id } = req.params;

  const recommendation = await getRecommendation(id);

  try {
    return res.send({
      status: "ok",
      data: recommendation,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  searchRecommendationController,
  getRecommendationController,
};
