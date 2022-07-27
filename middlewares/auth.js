const { generateErrors } = require("../auxOps/helpers");
const jwt = require("jsonwebtoken");

function authUser (req, res, next) {
    try {
        const {authorization} = req.headers;
        if (!authorization) {
            throw generateErrors("No se ha recibido token de autenticación", 401);
        }

        //Así se comprueba el token
        let token;
        try{
            token = jwt.verify(authorization, process.env.TOKEN);
        } catch(error) {
            throw generateErrors ("token incorrecto", 401);
        }
        // lo guardo en la request (req)
        req.userId = token.id;
        console.log("Esto es el id en auth", req.userId);
        next() //Con esto se va al otro middleware(controlador) de esta ruta.
    } catch (error) {
        next(error)
    }
}

module.exports = {
    authUser
}