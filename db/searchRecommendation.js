const { getConnection } = require("./db");
const { generateErrors } = require("../auxOps/helpers");

async function searchRecommendation(id) {
  let connection;
  try {
    connection = await getConnection();
    const [result] = await connection.query(
      `SELECT lugar,categoría FROM recomendaciones WHERE id_rec = ?`,
      [id]
    );

    if (result.length === 0) {
      throw generateErrors("La recomendación no existe", 404);
    }

    return result[0];
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

module.exports = {
  searchRecommendation,
};
