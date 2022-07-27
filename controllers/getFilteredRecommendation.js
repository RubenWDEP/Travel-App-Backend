const Joi = require("joi");
const {getRecommendationsByParams} = require("../db/getRecommendations");

const schemaCategoria = Joi.string().required();

const getFilteredRecommendationsController = async (req, res, next)=>{
    try {
        const {searchBar, criteria} = req.query;
    
        console.log("Esto es req", req.query);
        console.log("Esto es lugar en getFilteredRecommendationsController", criteria);
        console.log("Esto es categoria en getFilteredRecommendationsController",searchBar);

        if (criteria && searchBar) {
            const getFilteredRecommendations = await getRecommendationsByParams(criteria, searchBar);
            console.log(getFilteredRecommendations);
            return res.send({
                status: 200,
                results: getFilteredRecommendations,
            });
        }
    
    
    } catch (error) {
        console.error(error.message)
        next(error);
    }
    }
    
    module.exports = {
        getFilteredRecommendationsController
    }