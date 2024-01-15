const {retrieveEndPoints} = require("../models/api.models.js");
exports.getAPI = (request, response) => {
    retrieveEndPoints().then((apiEndPoints)=>{
        response.status(200).send({apiEnd:apiEndPoints })
    })
}
