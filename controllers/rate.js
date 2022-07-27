const {createRate, readPreviousRateValue, createUserRate} = require("../db/rateRecommendation");


const rateRecommendations = async (req, res, next)=>{
    try {
        console.log("Esto es requ.body:", req.body);
        const {id_rec, rateValue, userId} = req.body;
        console.log("ESto es la votación:", rateValue);
        console.log("ESto es el id de la recomendación:", id_rec);

        const previousValue = await readPreviousRateValue(id_rec, rateValue);
        console.log("Esto es previousValue:", previousValue);

        const value = previousValue + 1;
        console.log("Esto es value:", value);
        
        const globalrate = await createRate(id_rec, value, rateValue); 
        console.log("Esto es rate:", globalrate); 

        const userRate = await createUserRate(userId, rateValue, id_rec);
        console.log("Esto es rate:", userRate);

        res.send({
            Status: 200, 
            Message: "¡¡¡Gracias por tu voto!!!"
        })

    } catch (error) {
        next(error);
    }

};

module.exports = {
    rateRecommendations
}