const express = require("express");
const cors = require("cors"); // middleware
const app = express();

const {
  errorHandler,
  logErrors,
  boomErrorHandler,
} = require("./middlewares/errorHandler");

const port = process.env.PORT || 3000;
const routerAPI = require("./routes");

app.use(express.json());

const whiteList = ["http://localhost:8080", "https://quarzizus.web.app"];
const options = {
  origin: (origin, cb) => {
    if (whiteList.includes(origin) || !origin) {
      // error, allow
      cb(null, true);
    } else {
      cb(new Error("No permitido"));
    }
  },
};

app.use(cors(options)); // habilitar cualquier dominio

app.get("/", (req, res) => {
  res.send("HOME");
});

routerAPI(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);
app.listen(port, () => console.log("Corriendo en -> " + port));
