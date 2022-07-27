const { getConnection } = require("./db");
const { generateErrors } = require("../auxOps/helpers");

async function getRecommendationsByParams(criteria, searchBar) {
  
  let connection;
  try {
    connection = await getConnection();
        console.log("Estoy en getRecommendationsByLocation con:", criteria, searchBar)
        const [result] = await connection.query(`SELECT * from recomendaciones WHERE ${criteria} = ?`, [searchBar]);
        console.log(result);

    if (result.length === 0) {
        throw generateErrors("La recomendación no existe", 404);
    } 

    return result;

  } finally {
    if (connection) {
      connection.release();
    }
  }
}


module.exports = {
  getRecommendationsByParams,
    
}