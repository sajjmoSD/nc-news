const {fetchArticleById, fetchArticles, fetchArticleByIdAndComments, incrementArticleVotes} = require("../models/articles.models.js")

exports.getArticleById = (request,response,next) => {
    const { article_id } = request.params
    fetchArticleById(article_id).then((articles)=>{
        response.status(200).send(articles)
    })
    .catch((err)=>{
        next(err)
    })
}
exports.getArticles = (request, response, next) => {
    const  {sort_by, order} = request.query
    fetchArticles(sort_by, order).then((articles)=>{
        response.status(200).send({articles: articles})
    })
    .catch((err)=>{
        next(err)
    })
}
exports.getArticleByIdAndComments = (request, response, next) => {
    const {article_id} = request.params;
    fetchArticleByIdAndComments(article_id).then((comments)=>{
            response.status(200).send({comments})
    })
    .catch((err)=>{
        if(err.code === '42P01' || (err.status === 404)){
            response.status(404).send({msg: 'Invalid ID or No Comments'})
        } else if(err.status === 400){
            response.status(400).send()
        } else {
            next(err)
        }
    })
}
exports.updateArticleVotes = (request, response, next) => {
    const {article_id} = request.params;
    const { inc_votes } = request.body;
    incrementArticleVotes(article_id, inc_votes).then((updatedArticle)=>{
      if(!updatedArticle){
        return response.status(404).send({msg: "Article Not Found"})
      } 
        response.status(200).send({article: updatedArticle})
    })
    .catch((err)=>{
        next(err)
    })
}