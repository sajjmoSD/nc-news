const express = require("express")
const articleRouter = express.Router();
const {getArticles, getArticleById, getArticleByIdAndComments, updateArticleVotes} = require("../controllers/articles.controllers");
const { postComment } = require("../controllers/comments.controllers");

articleRouter
.route('/')
    .get(getArticles)
articleRouter
.route('/:article_id')
    .get(getArticleById)
    .patch(updateArticleVotes)
articleRouter
.route('/:article_id/comments')
        .get(getArticleByIdAndComments)
        .post(postComment)
module.exports = articleRouter;
