const { getConnection } = require("./db");
//const { generateErrors } = require("../auxOps/helpers");

async function createRecommendation(
  titulo,
  categoria,
  lugar,
  entradilla,
  texto,
  foto = "",
  id_user_reg
) {
  let connection;
  try {
    connection = await getConnection();
    const [result] = await connection.query(
      `
        INSERT INTO recomendaciones (titulo, categoría, lugar, entradilla, texto, foto, id_user_reg)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [titulo, categoria, lugar, entradilla, texto, foto, id_user_reg]
    );

    //Nota de berto: para que queréis esta query? Respuesta Rubén: es para que se cree la fila de valoraciones con el mismo id que la recomendación.
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
