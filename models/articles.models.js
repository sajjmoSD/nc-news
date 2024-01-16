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
exports.fetchArticles = (sortBy = "created_at", order = 'desc') => {
    const allowedOrders = ['asc', 'desc']
    let sql = (`
    SELECT 
    articles.article_id,
    articles.author,
    articles.title,
    articles.topic,
    articles.created_at,
    articles.votes,
    articles.article_img_url,
    COUNT(comments.comment_id)::INT AS comment_count
    FROM articles
    LEFT JOIN comments ON articles.article_id = comments.article_id
    GROUP BY articles.article_id`)
    if(sortBy){
        sql += ` ORDER BY ${sortBy} ${order}`
    }
    return db.query(sql)
}
exports.fetchArticleByIdAndComments = (article_id) => {
    return db.query(`
    SELECT * FROM comments
    WHERE article_id = $1
    ORDER BY created_at DESC;
    `,[article_id]
    )
    .then((result)=>{
        if(result.rowCount === 0){
            return Promise.reject({msg:"Not Found"})
        } else {
            return result.rows;
            
        }
    })
}