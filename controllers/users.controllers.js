
const {fetchUsers, fetchUsersByUsername} = require("../models/users.models");

exports.getUsers = (request, response, next) => {
    fetchUsers().then((users)=>{
        response.status(200).send({users: users.rows})
    })
    .catch((err)=>{
        next(err)
    })
}

exports.getUsersByUsername = (request, response, next) => {
const username = request.params.username;
fetchUsersByUsername(username).then((user)=>{
    response.status(200).send({user: user.rows})
})
.catch((err)=>{
    next(err)
})
}