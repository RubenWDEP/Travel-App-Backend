const { preSearch } = require("../db/preSearch");



const preSearchController = async (req, res, next) => {

    try {
        const { firstLetters } = req.query;
        console.log("Esto es el body", req.query);
        console.log("Esto es el firstLetters", firstLetters);
        const firstLettersMod = `${firstLetters}%`
        console.log("Esto es el firstLetters", firstLettersMod);
        const preSearchRequestToDb = await preSearch(firstLettersMod);
        console.log("Esto es preSearchRequestToDb", preSearchRequestToDb);

        return res.send({
            status: 200,
            results: preSearchRequestToDb,
        });

    } catch (error) {
        console.error("No hay coincidencia...")
        next(error);
    }
}

module.exports = {
    preSearchController
}