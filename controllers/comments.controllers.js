const {insertComment} = require("../models/comments.models")

exports.postComment = (req,res,next) => {
    const {article_id} = req.params;
    const {username, body} = req.body;
    if(!username){
        return res.status(400).send({error: "username required"})
    } else if(!body){
        return res.status(400).send({error: "body required"})
    }
    insertComment(article_id, username, body).then((comment)=>{
        res.status(201).send({comments: comment})//Responds with posted comment
    })
    .catch((err)=>{
        if(err.code === "23503"){
            console.log(err)
            res.status(400).send({error: "Author Not Found"})
        }  else  {
            next(err)
        }
    })
}