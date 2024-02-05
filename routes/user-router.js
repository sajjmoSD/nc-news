const userRouter = require("express").Router();
const {getUsers, getUsersByUsername} = require("../controllers/users.controllers")

userRouter.route('/')
    .get(getUsers)
userRouter.route('/:username')
    .get(getUsersByUsername)


module.exports = userRouter;