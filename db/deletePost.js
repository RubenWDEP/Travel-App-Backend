const { getConnection } = require("./db");
const { generateErrors } = require("../auxOps/helpers");
const { getRecommendationByRegisteredUser } = require("./getRecommendation");


async function deletePost (id_rec) {
    let connection;

    try {
        connection = await getConnection();
        const [result] = await connection.query(
            `DELETE FROM recomendaciones WHERE id_rec = ?`,
            [id_rec]
          );

        
        if (result.affectedRows === 0) {
              throw generateErrors("Post no existente", 404);
        }
        console.log("Esto es result de la función deletePost",result);
        return result;
    } finally {
        if (connection) {
            connection.release();
          }
    }
}

module.exports = {
    deletePost
}