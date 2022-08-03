const { getConnection } = require("./db");
//const { generateErrors } = require("../auxOps/helpers");

async function createRecommendation(titulo, categoria, lugar, entradilla, texto, foto = "", id_user_reg, create_by) {
  let connection;
  try {
    connection = await getConnection();
    const [result] = await connection.query(
      `
        INSERT INTO recomendaciones (titulo, categoría, lugar, entradilla, texto, foto, id_user_reg, create_by)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [titulo, categoria, lugar, entradilla, texto, foto, id_user_reg, create_by]
    );

    const [resultRatingquery] = await connection.query(`
    INSERT INTO rating (ceroestrellas, unaestrella, dosestrellas, tresestrellas, cuatroestrellas, cincoestrellas)
    VALUES (?, ?, ?, ?, ?, ?)`, [0, 0, 0, 0, 0, 0]);

    return result;
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

module.exports = {
  createRecommendation,
};
