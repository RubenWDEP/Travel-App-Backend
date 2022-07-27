const { generateErrors } = require("../auxOps/helpers");
const { createUser, getUserbyEmail } = require("../db/auxiliaryFunctions");
const Joi = require("joi");
const validateEmail = Joi.string().email().required();
const validatePassword = Joi.string().min(8).max(15).required();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRegister = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    const emailValidation = validateEmail.validate(email);
    const passwordValidation = validatePassword.validate(password);
    if (emailValidation.error || passwordValidation.error) {
      throw generateErrors(
        "Email o password no válido. Por favor, introduzca un email y/o una contraseña válidas.",
        400
      );
    }

    const id = await createUser(email, password);
    console.log(id);

    res.send({
      Message: "El usuario se ha registrado correctamente",
    });
  } catch (error) {
    next(error);
  }
};

const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    const emailValidation = validateEmail.validate(email);
    const passwordValidation = validatePassword.validate(password);
    if (emailValidation.error || passwordValidation.error) {
      throw generateErrors(
        "Email o password no válido. Por favor, introduzca un email y/o una contraseña válidas.",
        400
      );
    }

    const user = await getUserbyEmail(email);
    // console.log(user);
    //Comparación de las contraseñas
    const passwordComparison = await bcrypt.compare(password, user.password);
    // console.log(passwordComparison, "Este es el resultado de la compración de las passwords");
    //Aquí lanzo el error si sucede.
    if (!passwordComparison) {
      throw generateErrors("La contraseña es incorrecta", 401);
    }

    //Esto es el payload
    const payload = { id: user.id_reg };
    console.log(payload);

    //Esto es la firma del token
    const token = jwt.sign(payload, process.env.TOKEN, { expiresIn: "1d" });

    res.send({
      Message: "Email y contraseña correctos",
      Token: token,
      id: user.id_reg
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  userRegister,
  userLogin,
};
