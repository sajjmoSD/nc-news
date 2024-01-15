const {retrieveTopics} = require("../models/topics.models.js")
const topicData = require("../db/data/test-data/index.js")

exports.getTopics = (request, response) => {
    retrieveTopics(topicData).then((topic)=>{
        console.log(topic)
        response.status(200).send({topics: topic})
    })
    .catch((err)=>{
        next(err)
    })
};