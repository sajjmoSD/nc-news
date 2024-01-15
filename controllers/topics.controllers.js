const {retrieveTopics} = require("../models/topics.models.js")
const topicData = require("../db/data/test-data/index.js")

exports.getTopics = (request, response, next) => {
    retrieveTopics(topicData).then((topics)=>{
        response.status(200).send({topics: topics})
    })
    .catch((err)=>{
        next(err)
    })
};