const express = require("express");
const app = express();
require("dotenv").config();
const morgan = require("morgan");
const fileupload = require("express-fileupload");
const cors = require("cors");

const { userRegister, userLogin } = require("../controllers/registerLogin");
const { publishRecommendations } = require("../controllers/publish");
const { rateRecommendations } = require("../controllers/rate");
const { authUser } = require("../middlewares/auth");
const { getUserController } = require("../controllers/getUserData")

const {
  searchRecommendationController,
  getRecommendationController,
} = require("../controllers/recommendations");
const { getRatingController } = require("../controllers/getRating");
const { getFilteredRecommendationsController } = require("../controllers/getFilteredRecommendation");
const { getPostsFromCurrentUserController } = require("../controllers/getPostsFromCurrentUserController");
const { deletePostController } = require("../controllers/deletePostController");
const { getTotalVotesController } = require("../controllers/getTotalVotesController");
const { preSearchController } = require("../controllers/preSearchCrontoller");
const { commentsController } = require("../controllers/commentsController");
const { getCommentsController } = require("../controllers/getCommentsController");

//Esta debe ser el primer middleware para poder trabajar con las imágenes-----
app.use(fileupload());

//Parámetros para desarrollo ----------------------------
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use('/upload', express.static('./upload'));

//Rutas anónima----------------------------------
app.post("/search", searchRecommendationController);
app.get("/recommendation/:id", getRecommendationController);
app.get("/getrecommendations", getFilteredRecommendationsController);
app.post("/gettotalvotes", getTotalVotesController);
app.post("/register", userRegister);
app.post("/login", userLogin);
app.get("/comments/load", getCommentsController);

// Rutas privadas
app.get("/login/onlineuser", authUser, getUserController);
app.get("/getuserrating", authUser, getRatingController);
app.post("/publish", authUser, publishRecommendations);
app.post("/raterecommendation", authUser, rateRecommendations);
app.get("/getposts", authUser, getPostsFromCurrentUserController);
app.post("/deletepost", authUser, deletePostController);
app.get("/presearch", authUser, preSearchController);
app.post("/comments", authUser, commentsController);
// app.put("/comments/delete", authUser, deleteCommentsController);

//Errores----------------------------------------------
app.use((req, res) => {
  res.status(404);
  res.send({
    status: "error",
    message: "Not found",
  });
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(error.httpStatus || 500);
  res.send({
    status: error,
    message: error.message,
  });
});

//El puerto 3001 está  escuchando:
app.listen(3001, () => {
  console.log("Corriendo servidor en el puerto 3001...");
});
