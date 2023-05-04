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

// const run = async () => {
//   const poll = await pollController.createPoll({
//     title: "What is your favorite color?",
//     description: "By blue are also meant blue-like colors, like turkish.",
//     options: [
//       {
//         id: 0,
//         text: "Blue"
//       },
//       {
//         id: 1,
//         text: "Red"
//       }
//     ],
//     setting: {
//       voices: 1,
//       worst: false,
//       deadline: "2023-05-29T17:21:39.000Z"
//     },
//     fixed: 0
//   })
// }


// }
//  const tut1 = await controller.createTutorial({
//     title: "Tut#1",
//     description: "Tut#1 Description",
//   });

//   const tut2 = await controller.createTutorial({
//     title: "Tut#2",
//     description: "Tut#2 Description",
//   });

//   const comment1 = await controller.createComment(tut1.id, {
//     name: "bezkoder",
//     text: "Good job!",
//   });

//   await controller.createComment(tut1.id, {
//     name: "zkoder",
//     text: "One of the best tuts!",
//   });

//   const comment2 = await controller.createComment(tut2.id, {
//     name: "aKoder",
//     text: "Hi, thank you!",
//   });

//   await controller.createComment(tut2.id, {
//     name: "anotherKoder",
//     text: "Awesome tut!",
//   });

//   const tut1Data = await controller.findTutorialById(tut1.id);
//   console.log(
//     ">> Tutorial id=" + tut1Data.id,
//     JSON.stringify(tut1Data, null, 2)
//   );

//   const tut2Data = await controller.findTutorialById(tut2.id);
//   console.log(
//     ">> Tutorial id=" + tut2Data.id,
//     JSON.stringify(tut2Data, null, 2)
//   );

//   const comment1Data = await controller.findCommentById(comment1.id);
//   console.log(
//     ">> Comment id=" + comment1.id,
//     JSON.stringify(comment1Data, null, 2)
//   );

//   const comment2Data = await controller.findCommentById(comment2.id);
//   console.log(
//     ">> Comment id=" + comment2.id,
//     JSON.stringify(comment2Data, null, 2)
//   );

//   const tutorials = await controller.findAll();
//   console.log(">> All tutorials", JSON.stringify(tutorials, null, 2));
// };

// db.sequelize.sync();
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
//   //run();
// });
