const Joi = require("joi");
const path = require("path");
const sharp = require("sharp");
const {nanoid} = require("nanoid"); //ojo al requerir nanoid, hay que hacer destructuring...
const { generateErrors, createPathIfNotExists } = require("../auxOps/helpers");
const {createRecommendation} = require("../db/publishRecommendation");
const { getRecommendationByRegisteredUser } = require("../db/getRecommendation");

const schemaTitulo = Joi.string().min(1).max(50).required();
const schemaCategoria = Joi.string().min(1).max(50).required();
const schemaLocation = Joi.string().min(1).max(50).required();
const schemaEntradilla = Joi.string().min(1).max(50).required();
const schemaTexto = Joi.string().max(280).required();


const publishRecommendations = async (req, res, next)=>{
    
    try {
        console.log(req.files);
        console.log(req.body);
        console.log("Esto es el user ID", req.userId);
        const id_user_reg = req.userId;
        const { titulo, categoria, lugar, entradilla, texto} = req.body;
        const validateRecommendationTitle = schemaTitulo.validate(titulo);
        const validateRecommendationcategory = schemaCategoria.validate(categoria);
        const validateRecommendationLocation = schemaLocation.validate(lugar);
        const validateRecommendationEnt = schemaEntradilla.validate(entradilla);
        const validateRecommendationText = schemaTexto.validate(texto);
        // const validateRecommendation = recommendation.validate({titulo, categoria, entradilla, texto});
        if(validateRecommendationTitle.error || validateRecommendationcategory.error || validateRecommendationEnt.error || validateRecommendationText.error || validateRecommendationLocation.error ){
            throw generateErrors("Algunos de los campos están vacíos.", 400)
        }

        let fotoName;
        if(req.files && req.files.foto) {
            //Primero creo el directorio donde voy a guardar los archivos
            const uploadDirectory = path.resolve(__dirname, "../upload");
            // console.log(uploadDirectory);
            //Ahora creo la carpeta
            await createPathIfNotExists(uploadDirectory);
            //Proceso la imagen
            const image = sharp(req.files.foto.data);
            image.resize(1000);

            //Guardo la imagen en la carpeta que creo más arriba
            fotoName = `${nanoid(15)}.jpg`; //ojo al requerir nanoid...
            await image.toFile(path.resolve(uploadDirectory, fotoName));
        }

        const publish = await createRecommendation(titulo, categoria, lugar, entradilla, texto, fotoName, id_user_reg);

        const publishData = await getRecommendationByRegisteredUser(req.userId);
        console.log(publishData);

        res.send({
            message: "¡¡¡Muy bien!!! Has publicado tu recomendación",
            publishData: publishData
        })
    } catch (error) {
        next(error);
    }

};



module.exports = {
    publishRecommendations, 

}