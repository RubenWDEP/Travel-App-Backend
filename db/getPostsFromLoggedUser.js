const { getConnection } = require("./db");
const { generateErrors } = require("../auxOps/helpers");

async function getPostsFromCurrentUser (id_user_reg) {

let connection;

    try {
        connection = await getConnection();
        const [result] = await connection.query(
            `SELECT * FROM recomendaciones WHERE id_user_reg=?`,
            [id_user_reg]
          );
          console.log("Esto es result de la función getPostsFromCurrentUser",result);
        /* if (result.length === 0) {
              throw generateErrors("Usuario no existente", 404);
        } */
        return result;
    } finally {
        if (connection) {
            connection.release();
          }
    }
}

module.exports = {
    getPostsFromCurrentUser
}
