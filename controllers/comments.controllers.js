const {insertComment, removeComment} = require("../models/comments.models")

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
            res.status(400).send({error: "Author Not Found"})
        }  else  {
            next(err)
        }
    })
}
exports.deleteComment = (req,res,next)=>{
    const {comment_id} = req.params;
    removeComment(comment_id).then(()=>{
        res.status(204).send()
    })
    .catch((err)=>{
        if(err.status === 404){
            return res.status(404).send({msg: err.msg})
        } else{
            next(err)
        }
    })
}
