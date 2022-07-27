const { getConnection } = require("./db");

async function preSearch(firstLetters) {
    let connection;
    console.log("esto es firstletters", firstLetters)
    try {
        connection = await getConnection();
        const [preSearchAction] = await connection.query(`SELECT lugar FROM recomendaciones WHERE lugar LIKE  ?`, [firstLetters]);
        console.log("Esto es connection en presearch", preSearchAction);

        return preSearchAction;

    } finally {
        if (connection) {
            connection.release();
        }
    }
}

module.exports = {
    preSearch
}