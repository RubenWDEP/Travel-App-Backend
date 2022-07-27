const { countVotes } = require("../db/getTotalVotes");



const getTotalVotesController = async (req, res, next) => {
    try {
        const { arrayId } = req.body;


        console.log("Esto es req", req.body);
        console.log("Esto es id_recArray", arrayId);

        if (arrayId) {
            const getTotalVotesAction = await countVotes(arrayId);
            console.log(getTotalVotesAction);
            return res.send({
                status: 200,
                results: getTotalVotesAction,
            });
        }


    } catch (error) {
        console.error(error.message)
        next(error);
    }
}

module.exports = {
    getTotalVotesController
}