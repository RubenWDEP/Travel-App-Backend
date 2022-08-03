const { getConnection } = require("./db");

async function commentAction(id, userComment, createBy) {
    let connection;
    try {
        connection = await getConnection();
        const [result] = await connection.query(`INSERT INTO comments(id_com_rec, comment, create_by) VALUES (?,?,?)`, [id, userComment, createBy]);

        return result;

    } finally {
        if (connection) {
            connection.release();
        }
    }

}

module.exports = {
    commentAction
}