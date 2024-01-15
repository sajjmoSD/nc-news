const express = require("express")
const {getTopics} = require("./controllers/topics.controllers")//controller

const app = express();
app.use(express.json());
//URL + method

app.get("/api/topics", getTopics)

//error handling 
app.use((err,req,res,next)=>{
    if(err.status === 404){
        res.status(404).send({msg: err.msg})
    } else {
        next(err)
    }
})
module.exports = app;