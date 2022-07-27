const Joi = require("joi");
const {getUserAfterLogin} = require("../db/getUser");

const schemaCategoria = Joi.number().required();

const getUserController = async (req, res, next)=>{
try {
    const id = req.userId;
    const validateID = schemaCategoria.validate(id);
    console.log("Esto es el id en getusercontroller",id);
    const getUserAfterLoginData = await getUserAfterLogin(id);
    console.log(getUserAfterLoginData);



    return res.send({
        status: 200,
        data: getUserAfterLoginData,
    });

} catch (error) {
    next(error);
}
}

module.exports = {
    getUserController
}