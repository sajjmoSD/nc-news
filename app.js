const express = require("express")
const {getTopics} = require("./controllers/topics.controllers")//controller
const {getAPI} = require("./controllers/api.controllers");

const app = express(); 
// app.use(express.json()); -> do not need just yet -> following from feedback
//URL + method

app.get("/api/topics", getTopics)
app.get("/api", getAPI)

//error handling 
app.use((err,req,res,next)=>{
    if(err.status === 404){
        res.status(404).send({msg: err.msg})
    } else {
        next(err)
    }
})
module.exports = app;