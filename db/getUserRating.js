const { getConnection } = require("./db");

async function getUserRating(id) {
    let connection;

    try {
        connection = await getConnection();
        const [result] = await connection.query(
            `SELECT id_user_rating, votevalue FROM id${id}rating`
        );

        console.log("Esto es result de la función getUserRating", result);
        return result;
    } finally {
        if (connection) {
            connection.release();
        }
    }
}

module.exports = {
    getUserRating
}