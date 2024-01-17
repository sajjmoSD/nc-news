const db = require("../db/connection")
exports.insertComment = (article_id, username, body)=>{
    return db.query(`
    INSERT INTO comments (article_id, author, body)
    VALUES ($1, $2, $3)
    RETURNING *;
    `,
    [article_id, username, body]
    )
    .then((result)=>{
        return result.rows[0]
    })
}
exports.removeComment = (comment_id) => {
    return db.query(`
    DELETE FROM comments 
    WHERE comment_id = $1
    RETURNING *;
    `,[comment_id])
    .then((result)=>{
        if(result.rowCount === 0){
            return Promise.reject(
                {
                    status: 404,
                    msg: "comment ID does not exist"
                })
        }
    })
}