const express = require("express");
const app = express();
const {
  errorHandler,
  logErrors,
  boomErrorHandler,
} = require("./middlewares/errorHandler");

const port = 3000;
const routerAPI = require("./routes");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("HOME");
});

routerAPI(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);
app.listen(port, () => console.log("Corriendo en -> " + port));
