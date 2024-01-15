const db = require("../db/connection")

exports.fetchArticleById = (article_id) => {
    return db
    .query(`SELECT * FROM articles
                        WHERE article_id = $1;
          `,[article_id]
           )
    .then((result)=>{
        if(result.rowCount === 0){
            return Promise.reject({msg:"Not Found"})
        } else {
            return result.rows[0]

        }
    })
}