const Joi = require("joi");
const { commentAction } = require("../db/comments");

const schemaComment = Joi.string().max(100).required();

const commentsController = async (req, res, next) => {
    try {
        const { id, userComment, createBy } = req.body;
        console.log("Esto es req.body", req.body);
        const validateSchemaComment = schemaComment.validate(userComment);
        if (validateSchemaComment.error) {
            throw new Error("Comentario no válido. Comprueba que no haya errores o no supere la longitud permitida.")
        }

        const newComment = await commentAction(id, userComment, createBy);
        console.log("Esto es newComment", newComment);

        return res.send({
            status: 200,
            results: "Comentario guardado"
        });

    } catch (error) {
        console.error(error);
        next(error);
    }
}

module.exports = {
    commentsController
}