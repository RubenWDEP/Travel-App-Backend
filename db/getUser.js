const { getConnection } = require("./db");
const { generateErrors } = require("../auxOps/helpers");

async function getUserAfterLogin (id_reg) {
    let connection;

    try {
        connection = await getConnection();
        const [result] = await connection.query(
            `SELECT id_reg, email, create_at FROM reglog WHERE id_reg=?`,
            [id_reg]
          );
        if (result.length === 0) {
              throw generateErrors("Usuario no existente", 404);
        }
        console.log("Esto es result de la función getUserAfterLogin",result);
        return result[0];
    } finally {
        if (connection) {
            connection.release();
          }
    }
}

module.exports = {
    getUserAfterLogin
}