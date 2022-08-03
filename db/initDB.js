require("dotenv").config();

const { getConnection } = require("./db");

async function main() {
  let connection;

  try {
    connection = await getConnection();
    console.log("He creado el conexiones...");

    console.log("Creando tablas...");

    const createTableRegLog =
      await connection.query(`CREATE TABLE IF NOT EXISTS reglog(
            id_reg INTEGER PRIMARY KEY AUTO_INCREMENT,
            email VARCHAR (50) UNIQUE NOT NULL,
            password VARCHAR(100) NOT NULL,
            create_at DATETIME DEFAULT CURRENT_TIMESTAMP)`);

    if (createTableRegLog[0].warningStatus === 1) {
      console.log("La tabla de registro ya existe.");
    } else {
      console.log("Se ha creado la tabla de registro correctamente");
    }

    const createTableRecomendaciones =
      await connection.query(`CREATE TABLE IF NOT EXISTS recomendaciones(
            id_rec INTEGER PRIMARY KEY AUTO_INCREMENT,
            titulo VARCHAR (100) NOT NULL,
            categoría VARCHAR(50) NOT NULL,
            lugar VARCHAR(50)NOT NULL,
            entradilla VARCHAR(150), 
            texto VARCHAR(280) NOT NULL,
            foto VARCHAR(200),
            id_user_reg INTEGER NOT NULL,
            create_by VARCHAR(50) NOT NULL,
            create_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            foreign key (id_user_reg) references reglog(id_reg) on delete cascade)`);

    if (createTableRecomendaciones[0].warningStatus === 1) {
      console.log("La tabla recomendaciones ya existe.");
    } else {
      console.log("Se ha creado la tabla recomendaciones correctamente");
    }

    const createTotalRatingTable =
      await connection.query(`CREATE TABLE IF NOT EXISTS rating(
            id_rat_rec INTEGER PRIMARY KEY AUTO_INCREMENT,
            ceroestrellas INTEGER NOT NULL,
            unaestrella INTEGER NOT NULL ,
            dosestrellas INTEGER NOT NULL ,
            tresestrellas INTEGER NOT NULL ,
            cuatroestrellas INTEGER NOT NULL ,
            cincoestrellas INTEGER NOT NULL ,
            create_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            foreign key (id_rat_rec) references recomendaciones(id_rec) on delete cascade)`);

    if (createTotalRatingTable[0].warningStatus === 1) {
      console.log("La tabla de votaciones ya existe.");
    } else {
      console.log("Se ha creado la tabla de votaciones correctamente");
    }

    const createCountingArrangingTable =
      await connection.query(`CREATE TABLE IF NOT EXISTS countingVotes(
            id_vot INTEGER PRIMARY KEY AUTO_INCREMENT,
            id_vot_rec INTEGER NOT NULL,
            id_vot_user_reg INTEGER NOT NULL,
            votes VARCHAR(15),
            create_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            foreign key (id_vot_rec) references recomendaciones(id_rec) on delete cascade)`);

    if (createCountingArrangingTable[0].warningStatus === 1) {
      console.log("La tabla para contar/ordenar los votos totales ya existe.");
    } else {
      console.log("Se ha creado la tabla de recuento de votos correctamente");
    }

    const createCommentsTable =
      await connection.query(`CREATE TABLE IF NOT EXISTS comments(
            id_comment INTEGER PRIMARY KEY AUTO_INCREMENT,
            id_com_rec INTEGER NOT NULL,
            comment VARCHAR (100) NOT NULL,
            create_by VARCHAR(50),
            create_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            foreign key (id_com_rec) references recomendaciones(id_rec) on delete cascade)`);

    if (createCommentsTable[0].warningStatus === 1) {
      console.log("La tabla para comentar los post  ya existe.");
    } else {
      console.log("Se ha creado la tabla de comentarios de posts correctamente");
    }


  } catch (error) {
    console.error(error);
  } finally {
    if (connection) connection.release();
    process.exit();
  }
}
main();
