const { getUserRating } = require("../db/getUserRating");


const getRatingController = async (req, res, next)=>{
    try {
        const id = req.userId;
        console.log("Esto es el id en getRatingController",id);
        const getUserRatingAfterLoginData = await getUserRating(id);

        for (let i = 0; i < getUserRatingAfterLoginData.length; i++) {
            
            switch (getUserRatingAfterLoginData[i].votevalue) {
                case "ceroestrellas":
                    getUserRatingAfterLoginData[i].votevalue = 0;
                    break;
                case "unaestrella":
                    getUserRatingAfterLoginData[i].votevalue = 1; 
                    break;
                case "dosestrellas":
                    getUserRatingAfterLoginData[i].votevalue = 2; 
                    break;
                case "tresestrellas":
                    getUserRatingAfterLoginData[i].votevalue = 3; 
                    break;
                case "cuatroestrellas":
                    getUserRatingAfterLoginData[i].votevalue = 4;
                    break;
                case "cincoestrellas":
                    getUserRatingAfterLoginData[i].votevalue = 5; 
                    break;
                default:
                    // throw new Error();
                    break;
            }
            
        }

        console.log(getUserRatingAfterLoginData);
    
    
    
        return res.send({
            status: 200,
            data: getUserRatingAfterLoginData,
        });
    
    } catch (error) {
        next(error);
    }
    }
    
    module.exports = {
        getRatingController
    }