const {fetchArticleById, fetchArticles, fetchArticleByIdAndComments} = require("../models/articles.models.js")

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
        response.status(200).send({comments});
    })
    .catch((err)=>{
        next(err)
    })
}