const { getConnection } = require("./db");
const { generateErrors } = require("../auxOps/helpers");

async function countVotes (id_recArray) {

    let connection;
    try {
      connection = await getConnection();

      const totalVotes = [];
      for (let i = 0; i < id_recArray.length; i++) {
        const [resultCero] = await connection.query(`SELECT COUNT(votes) FROM countingvotes WHERE id_vot_rec = ? AND votes = "ceroestrellas"`, id_recArray[i]);
        const [resultUno] = await connection.query(`SELECT COUNT(votes) FROM countingvotes WHERE id_vot_rec = ? AND votes = "unaestrella"`, id_recArray[i]);
        const [resultDos] = await connection.query(`SELECT COUNT(votes) FROM countingvotes WHERE id_vot_rec = ? AND votes = "dosestrellas"`, id_recArray[i]);
        const [resultTres] = await connection.query(`SELECT COUNT(votes) FROM countingvotes WHERE id_vot_rec = ? AND votes = "tresestrellas"`, id_recArray[i]);
        const [resultCuatro] = await connection.query(`SELECT COUNT(votes) FROM countingvotes WHERE id_vot_rec = ? AND votes = "cuatroestrellas"`, id_recArray[i]);
        const [resultCinco] = await connection.query(`SELECT COUNT(votes) FROM countingvotes WHERE id_vot_rec = ? AND votes = "cincoestrellas"`, id_recArray[i]);

        const idRecObject ={
          id_rec: id_recArray[i], 
          resultCero: resultCero[0]["COUNT(votes)"],        
          resultUno: resultUno[0]["COUNT(votes)"],        
          resultDos: resultDos[0]["COUNT(votes)"],        
          resultTres: resultTres[0]["COUNT(votes)"],        
          resultCuatro: resultCuatro[0]["COUNT(votes)"],        
          resultCinco: resultCinco[0]["COUNT(votes)"],
        }  

        totalVotes.push(idRecObject);
        
        console.log("Esto es totalvotes en getTotalvotes", totalVotes);
        
      }
  
      /* if (totalVotes.length === 0) {
          throw generateErrors("La recomendación no ha sido votada aun", 404);
      }  */
  
      return totalVotes;
  
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }
  
  
  module.exports = {
    countVotes,
      
  }