const db = require("./app/models");
const express = require("express");
const cors = require("cors");
const app = express();


const corOptions = {
  origin: 'http://localhost:49715'
}



// Middlewares
app.use(cors(corOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true}))


//routers
const router = require("./routes/pollRouter");
app.use("/poll", router);
// //hier kommt auch router für vote router

// PORT
const PORT = process.env.PORT || 8080;


//test
app.get("/", (req, res)=>{
  res.send("Hello")
  console.log("test");
})


// Server
app.listen(PORT, ()=>{
  console.log(`The server is running on port ${PORT}`);
})
