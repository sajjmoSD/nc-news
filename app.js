const express = require("express")
const {getTopics} = require("./controllers/topics.controllers")//controller
const {getAPI} = require("./controllers/api.controllers");
const {getArticleById, getArticles, getArticleByIdAndComments, updateArticleVotes} = require("./controllers/articles.controllers")
const {postComment, deleteComment} = require("./controllers/comments.controllers")
const {getUsers} = require("./controllers/users.controllers")
const app = express(); 
app.use(express.json());
//URL + method

app.get("/api/topics", getTopics)
app.get("/api", getAPI)
app.get("/api/articles/:article_id", getArticleById)
app.get("/api/articles", getArticles)
app.get("/api/articles/:article_id/comments", getArticleByIdAndComments)
app.post("/api/articles/:article_id/comments", postComment)
app.patch("/api/articles/:article_id", updateArticleVotes)
app.delete("/api/comments/:comment_id", deleteComment)
app.get("/api/users", getUsers)
//error handling 
app.use((err,req,res,next)=>{
    if(err.msg === "Not Found"){
        res.status(404).send({msg: "Invalid ID present"})
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
app.use((err,req,res,next)=>{
    if(err.code === "23502"){
        res.status(400).send({msg: "Missing column"})
    } else {
        next(err)
    }
})

app.use((err,req,res,next)=>{
    console.log({msg:err})
    res.status(500).send({msg: err.msg})
})
module.exports = app;