const {getConnection} = require("./db");
const {generateErrors} = require("../auxOps/helpers")
const bcrypt = require("bcrypt");



async function createUser (email, password) {
    let connection;
    
    try {
        connection = await getConnection(); 
        const [user/* Este nombre puede ser cualquiera */] = await connection.query(`SELECT id_reg FROM reglog WHERE email = ?`, [email]); /* las consultas siempren devuelven un array. El primer término del array es lo que nos interesa. */
        console.log("Esto es el user si existe...",user);

        if(user.length>0) {
            throw generateErrors("Ya existe un usuario con este email", 409);
        }

        const encryptedPassword = await bcrypt.hash(password, 10);
        const [newUser] = await connection.query(`INSERT INTO reglog (email, password) VALUES(?, ?)`, [email, encryptedPassword]);

        //Creo una tabla para para cada que usuario vote:
        const newUserRatingTable = await connection.query(`CREATE TABLE id${newUser.insertId}rating  (
            id_user_rating INTEGER PRIMARY KEY,
            votevalue VARCHAR(15),
            create_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            foreign key (id_user_rating) references recomendaciones(id_rec) on delete cascade
        )`);

        return newUser.insertId;
        
    } finally{
        if(connection){
            connection.release()
        }
    }
    
}

async function getUserbyEmail (email) {
    let connection;
    try {
        connection = await getConnection();
        const [result] = await connection.query(`SELECT * FROM reglog WHERE email= ?`,[email]);
        if(result.length === 0) {
            throw generateErrors("No existe un usuario con este email", 404)
        }
        // console.log("Estoy probando el return de la función getuserbyemail:", result);
        return result[0]

    } finally {
        if(connection){
            connection.release();
        }
    }
}

module.exports = {
    createUser,
    getUserbyEmail
}