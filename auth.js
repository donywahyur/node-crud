const jwt = require("jsonwebtoken");
const jwtConfig = require("./config/jwt");

module.exports = () => {
  return (req, res, next) => {
    // console.log("auth");
    const token = req.headers["authorization"];
    console.log(token);
    if (!token) {
      res.status(404);
    } else {
      const tokenBody = token.slice(7);
      //   console.log(tokenBody);

      jwt.verify(tokenBody, jwtConfig.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
          res.status(404).json({ error: `error ${err}` });
        } else {
          next();
        }
      });
    }
  };
};
