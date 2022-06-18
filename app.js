const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const port = 3000;
const router = require("./routers/route.js");
const jwt = require("jsonwebtoken");
const jwtConfig = require("./config/jwt.js");

app.use(bodyparser.urlencoded());
app.use(bodyparser.json());

app.use("/", router);
app.get("/getToken", (req, res) => {
  const token = jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
      data: "foobar",
    },
    jwtConfig.JWT_SECRET_KEY
  );
  res.json({ token: token });
});

app.listen(port, () => {
  console.log(`Server listening to port ${port}`);
});
