const { getComments } = require('../db/getComments');


const getCommentsController = async (req, res, next) => {
    try {
        const { id_rec } = req.query;
        console.log("Esto es req.query", req.query);
        const getCommentAction = await getComments(id_rec);

        return res.send({
            status: 200,
            results: getCommentAction
        });


    } catch (error) {
        console.error(error);
        next(error);
    }

}

module.exports = {
    getCommentsController
}