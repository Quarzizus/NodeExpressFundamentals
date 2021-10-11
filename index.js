const express = require("express");
const app = express();
const port = 3000;
const routerAPI = require("./routes");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("HOME");
});

routerAPI(app);

app.listen(port, () => console.log("Corriendo en -> " + port));
