const express = require("express")
const {getTopics} = require("./controllers/topics.controllers")//controller
const {getAPI} = require("./controllers/api.controllers");
const {getArticleById, getArticles} = require("./controllers/articles.controllers")

const app = express(); 
app.use(express.json()); //-> do not need just yet -> following from feedback
//URL + method

app.get("/api/topics", getTopics)
app.get("/api", getAPI)
app.get("/api/articles/:article_id", getArticleById)
app.get("/api/articles", getArticles)
//error handling 
app.use((err,req,res,next)=>{
    if(err.msg === "Not Found"){
        res.status(404).send({msg: err.msg})
    } else {
        next(err)
    }
})
app.use((err,req,res,next)=>{
    if(err.code === "22P02"){
        res.status(400).send({msg: "Bad Request"})
    } else {
        next(err)
    }
})
app.use((err,req,res,next)=>{
    if(err.code === "42703"){
        res.status(400).send({msg: "Bad Request"})
    } else {
        next(err)
    }
})
module.exports = app;