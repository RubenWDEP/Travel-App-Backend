const { getPostsFromCurrentUser } = require("../db/getPostsFromLoggedUser");


const getPostsFromCurrentUserController = async (req, res, next) => {

    try {
        const {id_user_reg} = req.query;
        console.log("Esto es id_user_reg:", req.query);

        const allPosts = await getPostsFromCurrentUser(parseInt(id_user_reg));
        console.log("Esto es result en getPostsFromCurrentUserController:", parseInt(id_user_reg));
        
        return res.send({
            status: 200,
            results: allPosts,
        });

    } catch (error) {
        console.error(error.message)
        next(error);
    }

}

module.exports = {
    getPostsFromCurrentUserController
}