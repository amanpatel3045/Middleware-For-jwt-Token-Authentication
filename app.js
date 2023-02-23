const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const secretKey = "secretkey";
app.use(express.json());
const PORT = 5000;
app.get("/", (req, res) => {
  res.send("WELCOME TO HOME PAGE");
});

app.post("/login", (req, res) => {
  const user = {
    id: 1,
    username: "aman",
    email: "amanpatel3045@gmail.com",
  };
  jwt.sign({ user }, secretKey, { expiresIn: "300s" }, (err, token) => {
    res.json({
      message:"Logged In Successfull",
      token,
    });
  });
});
app.post("/profile", verifyTokenMiddleware, (req, res) => {
 res.send({message:"Welcome to profile page"})
});
function verifyTokenMiddleware(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
  const bearer=bearerHeader.split(" ");
  const token = bearer[1];
  req.token=token;
  jwt.verify(req.token,secretKey,(err,authData)=>{
    if(err){
      res.send({message:"INVALID TOKEN"})
    }else{
      next();
    }
  })
  
  } else {
    res.send({
      message: "Token is not valid",
    });
  }
}

app.listen(PORT, (req, res) => {
  console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
});
