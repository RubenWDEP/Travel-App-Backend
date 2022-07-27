const { deletePost } = require("../db/deletePost");
const { getRecommendationByRegisteredUser } = require("../db/getRecommendation");



const deletePostController = async (req, res, next) => {

    try {
        const {id_rec} = req.body;
        console.log("Esto es id_rec:", parseInt(id_rec));

        const deletePostAction = await deletePost(parseInt(id_rec));
        console.log("Esto es result en deletePostController:", deletePostAction);

        const updateResults = await getRecommendationByRegisteredUser(req.userId);
        
        return res.send({
            status: 200,
            results: deletePostAction,
            updateResults 
        });

    } catch (error) {
        console.error(error.message)
        next(error);
    }

}

module.exports = {
    deletePostController
}