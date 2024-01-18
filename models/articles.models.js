const db = require("../db/connection")
const { checkExists } = require("../db/seeds/utils")

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
exports.fetchArticles = (sortBy = "created_at", order = 'desc', topic) => {
    const allowedOrders = ['asc', 'desc']
    const allowedSorts = ['created_at']
    const allowedTopics = ["mitch", 'cats']
    if(!allowedSorts.includes(sortBy)){
        return Promise.reject({
            msg: "Invalid Column name"
        })
    }
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
    `)
    const sqlQueries = [];
    if(topic){
        sql += ` WHERE articles.topic = $1`;
        sqlQueries.push(topic)
    }
    sql += ` GROUP BY articles.article_id`;
    if(sortBy){
        sql += ` ORDER BY ${sortBy} ${order}`
    }
    return db.query(sql, sqlQueries)
    .then((result)=>{
        if(result.rowCount === 0){
            return Promise.reject
            ({
                status: 404, 
                msg:"Invalid topic name"
            })
        } else {
            return result.rows;
        }
    })
}
exports.fetchArticleByIdAndComments =  (article_id) => {
    return db.query(`
    SELECT * FROM comments
    WHERE article_id = $1
    ORDER BY created_at DESC;
    `,[article_id]
    )
    .then(async (result)=>{
        if(result.rowCount === 0){
            await checkExists('articles','article_id', article_id)
            return [];
        } else{
            return result.rows;
        }
    })
    .catch((err)=>{
        throw err
    })
    
}
exports.incrementArticleVotes = (article_id, newVotes) => {
    return db.query(`
    UPDATE articles
    SET votes = votes + $1
    WHERE article_id = $2
    RETURNING *;
    `, [newVotes, article_id])
    .then((result)=>{
        return result.rows[0]
    })
}
