const { getConnection } = require("./db");
const { generateErrors } = require("../auxOps/helpers");

async function getRecommendation(id) {
  let connection;
  try {
    connection = await getConnection();
    const [result] = await connection.query(
      `SELECT * from recomendaciones WHERE id_rec = ?`,
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

//Se incluye esta función para obtener los datos de las publicaciones de cada usuario.
async function getRecommendationByRegisteredUser (id_user_reg) {
  let connection;
  try {
    connection = await getConnection();
    const [result] = await connection.query(
      `SELECT * from recomendaciones WHERE id_user_reg = ?`,
      [id_user_reg]
    );

    /* if (result.length === 0) {
      throw generateErrors("La recomendación no existe", 404);
    } */

    return result;
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

module.exports = {
  getRecommendation,
  getRecommendationByRegisteredUser
};
