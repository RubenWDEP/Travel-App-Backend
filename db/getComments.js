const { getConnection } = require("./db");


async function getComments(id_com_rec) {
    let connection;

    try {
        connection = await getConnection();
        const [result] = await connection.query(`SELECT comment, create_by  FROM comments WHERE id_com_rec=?`, [id_com_rec]);

        return result;

    } finally {
        if (connection) {
            connection.release();
        }
    }
}

module.exports = {
    getComments
}