const {getConnection} = require("./db");

async function createRate (id_rec, value, ratingValue) {
    let connection;
    try {
        connection = await getConnection();
        const [resultRating] = await connection.query(`UPDATE rating SET ${ratingValue}=? WHERE id_rat_rec = ? `, [value, id_rec]);

        return resultRating.info;

    } finally {
        if (connection) {
            connection.release()
        }
    }
    
}

async function readPreviousRateValue (id_rec, ratingValue){
    let connection;
    try {
        connection = await getConnection();
        const [previousValue] = await connection.query(`SELECT ${ratingValue} FROM rating WHERE id_rat_rec = ?`, [id_rec]);

        return previousValue[0][`${ratingValue}`];

    } finally {
        if (connection) {
            connection.release()
        }
    }
}

async function createUserRate (userId, rateValue,id_rec) {
    let connection;
    try {
        connection = await getConnection();

        const [previousValueRatingUser] = await connection.query(`
            SELECT id_user_rating
            FROM id${userId}rating
            WHERE EXISTS (SELECT votevalue FROM id${userId}rating WHERE id_user_rating = ?)`,  [id_rec]);
            console.log("Este es el valor previo", previousValueRatingUser);

        const [previousValueGlobalRating] = await connection.query(`
            SELECT votes
            FROM countingvotes
            WHERE id_vot_user_reg = ? AND id_vot_rec=?`,  [userId, id_rec]);
            console.log("Este es el valor previo", previousValueGlobalRating);

        if(!previousValueRatingUser[0]){
            console.log("esto es la comprobación de si existe un registro en la tabla id14rating", previousValueRatingUser );

            const [resultRatingquery] = await connection.query(`INSERT INTO id${userId}rating (id_user_rating, votevalue) VALUES (?,?)`, [id_rec, rateValue]);
            console.log("Se han introducido los valores por primera vez", resultRatingquery);
        }
            
        const [voted] = await connection.query(`UPDATE id${userId}rating SET votevalue=? WHERE id_user_rating = ? `, [rateValue, id_rec]);
        console.log("Se ha actualizado la votación", voted);
        
        if(!previousValueGlobalRating[0]){
            console.log("esto es la comprobación de si existe un registro en la tabla id14rating", previousValueGlobalRating );

            const [resultGlobalRatingquery] = await connection.query(`INSERT INTO countingvotes (id_vot_rec,id_vot_user_reg, votes) VALUES (?,?,?)`, [id_rec, userId, rateValue]);
            console.log("Se han introducido los valores por primera vez", resultGlobalRatingquery);
        }
            
        const [countVotes] = await connection.query(`UPDATE countingvotes SET votes=? WHERE id_vot_user_reg = ? AND id_vot_rec=? `, [rateValue, userId, id_rec]);
        console.log("Se ha actualizado la votación", countVotes);

        return voted;

    } finally {
        if (connection) {
            connection.release()
        }
    }
}


module.exports = {
    createRate,
    readPreviousRateValue,
    createUserRate
}