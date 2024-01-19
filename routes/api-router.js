const apiRouter = require('express').Router()
const {getAPI} = require("../controllers/api.controllers")
const topicsRouter = require('./topics-router')
const articleRouter = require('./articles-router');
const commentRouter = require("./comments-router");
const userRouter = require("./user-router")
apiRouter.route("/")
    .get(getAPI)

apiRouter.use('/topics', topicsRouter)
apiRouter.use('/articles', articleRouter)
apiRouter.use('/comments', commentRouter)
apiRouter.use('/users', userRouter)


module.exports = apiRouter