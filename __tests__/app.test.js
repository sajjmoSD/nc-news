const request = require("supertest");
const app = require("../app.js")
const db = require("../db/connection.js");
const seed = require("../db/seeds/seed.js")
const data = require("../db/data/test-data");
const endpointFormat = require("../endpoints.json") //So i can match the return object to skeleton object
const commentsFormat = require("../db/data/test-data/comments.js")
const toBeSorted = require("jest-sorted")
afterAll(()=>{
    return db.end();
})
beforeEach(()=>{
    return seed(data);
})
describe("app",()=>{
    describe("GET /api/topics",()=>{
        test("Status Code: 200 and should return all topic data", () => {
            return request(app)
            .get("/api/topics")
            .expect(200)
            .then(({body})=>{
                const topicsData = body.topics.rows
                expect(topicsData.length).toBe(3)
                topicsData.forEach((topicData) => {
                    expect(typeof topicData.description).toBe("string")
                    expect(typeof topicData.slug).toBe("string")
                })
            });
        })
        test("GET: 404 if URL is spelt incorrectly", ()=>{
            return request(app)
            .get("/api/wrongURL")
            .expect(404)
            .then((response)=>{
                expect(response.statusCode).toBe(404)
            })
        })
    })
    describe("GET /api",()=>{
        test("Status Code: 200 and should return api endpoints", () => {
            return request(app)
            .get("/api/")
            .expect(200)
            .then(({body})=>{
                expect(endpointFormat).toMatchObject(body.apiEnd)
                //When Endpoints get updated it should still pass
                

            });
        })
        test("GET: 404 if URL is spelt incorrectly", ()=>{
            return request(app)
            .get("/incorrectURL")
            .expect(404)
            .then((response)=>{
                expect(response.statusCode).toBe(404)
            })
        })
    })
    describe("GET /api/articles/:article_id",()=>{
        test("Status Code: 200 and should return the correct article by id (1)",()=>{
            return request(app)
            .get("/api/articles/1")
            .expect(200)
            .then(({body})=>{
                const article = body
                expect(article).toMatchObject(
                    {
                        title: "Living in the shadow of a great man",
                        topic: "mitch",
                    }
                )
                expect(article.article_id).toBe(1)
            })
        })
        test("Status Code: 200 and should return the correct article by id (2)",()=>{
            return request(app)
            .get("/api/articles/2")
            .expect(200)
            .then(({body})=>{
                const article = body
                expect(article).toMatchObject(
                    {
                        title: "Sony Vaio; or, The Laptop",
                        topic: "mitch",
                    }
                )
                expect(article.article_id).toBe(2)
            })
        })
        test("Status Code: 404 - sends appropriate status code and error message when given a valid but non-existent id",()=>{
            return request(app)
            .get("/api/articles/999")
            .expect(404)
            .then((response)=>{
                expect(response.body.msg).toBe("Invalid ID present")
            })
        })
        test("Status Code: 400 - sends appropriate status code and error message when given an invalid id",()=>{
            return request(app)
            .get("/api/articles/helloWorld")
            .expect(400)
            .then((response)=>{
                expect(response.body.msg).toBe("Bad Request")
            })
        })
    })
    describe("GET /api/articles", () => {
        test("Status Code: 200 should return all details of articles in descending order using date /created_at", () => {
            return request(app)
            .get("/api/articles")
            .expect(200)
            .then(({body})=>{
                const articles = body.articles.rows
                articles.forEach((article)=>{
                    expect(typeof article.article_id).toBe("number")
                    expect(typeof article.author).toBe("string")
                    expect(typeof article.title).toBe("string")
                    expect(typeof article.topic).toBe("string")
                    expect(typeof article.created_at).toBe("string")
                    expect(typeof article.votes).toBe("number")
                    expect(typeof article.article_img_url).toBe("string")
                    expect(typeof article.comment_count).toBe("number")
                })
                expect(articles).toBeSorted("created_at", {
                    descending: true
                    //orders in descending order
                    
                })
               
            })
        })
        test("Should sort the articles by date using ASC order",()=>{
            return request(app)
            .get("/api/articles")
            .expect(200)
            .then(({body})=>{
                const articles = body.articles.rows
                expect(articles).toBeSorted("created_at", {
                    descending: false
                    //orders in ascending order
                })
                
            })
        })
        test("Status Code 400 if incorrect column given to query",()=>{
            return request(app)
            .get("/api/articles?sort_by=cheeseyburger")
            .expect(400)
            .then(({body})=>{
                expect(body.msg).toBe("Bad Request")
            })
        })
    })
    describe("GET /api/articles/:article_id/comments",()=>{
        test("Status Code: 200 should respond with array of comments from given article id with inclusion of some properties",()=>{
            return request(app)
            .get("/api/articles/1/comments")
            .expect(200)
            .then(({body})=>{
               const comments = body.comments
               comments.forEach((comment)=>{
                expect(typeof comment.comment_id).toBe("number")
                expect(typeof comment.body).toBe("string")
                expect(typeof comment.author).toBe("string")
                expect(typeof comment.votes).toBe("number")
                expect(typeof comment.created_at).toBe("string")
               })
               expect(comments).toBeSorted("created_at")
               expect(comments.length).toBe(11)
            })
        })
        test("Status Code: 404 - sends appropriate status code and error message when given a valid but non-existent id",()=>{
            return request(app)
            .get("/api/articles/999/comments")
            .expect(404)
            .then((response)=>{
                expect(response.body.msg).toBe("Invalid ID or No Comments")
            })
        })
        test("Status Code: 400 - sends appropriate status code and error message when given an invalid id",()=>{
            return request(app)
            .get("/api/articles/WRONG!/comments")
            .expect(400)
            .then((response)=>{
                expect(response.body.msg).toBe("Bad Request")
            })
        })
        test("Status Code: 200 when article exists but no comments for it should respond with empty array",()=>{
            return request(app)
            .get("/api/articles/2/comments")
            .expect(200)
            .then(({body})=>{
                expect(body.comments).toEqual([])
            })
        })
        describe("POST /api/articles/:article_id/comments",()=>{
            test("Status Code: 201 - Should insert new comment using the specific article ID",()=>{
                const newComment = {
                    username: "butter_bridge",
                    body: "This is a newly inserted comment"
                };
                return request(app)
                .post("/api/articles/2/comments")
                .send(newComment)
                .expect(201)
                .then(({body})=>{
                    expect(body.comments).toMatchObject({
                        body: "This is a newly inserted comment"
                    })

                })
            })
            test("Status Code: 400 - should respond with appropriate error message if missing a username",()=>{
                const newComment = {
                    body: "This is a newly inserted comment"
                };
                return request(app)
                .post("/api/articles/1/comments")
                .send(newComment)
                .expect(400)
                .then(({ body })=>{
                    expect(body.error).toBe("username required")
                })
            })
            test("Status Code: 400 - should respond with appropriate error message if missing a body",()=>{
                const newComment = {
                    username: "butter_bridge"
                };
                return request(app)
                .post("/api/articles/1/comments")
                .send(newComment)
                .expect(400)
                .then(({ body })=>{
                    expect(body.error).toBe("body required")
                })
            })
            test("Status Code: 400 - If foreign key is violated (author not found)",()=>{
                const newComment = {
                    username: "SantaClaus",
                    body: "This is a comment with an author that does not exist"
                };
                return request(app)
                .post("/api/articles/1/comments")
                .send(newComment)
                .expect(400)
                .then(({ body })=>{
                    expect(body.error).toBe("Author Not Found")
                })
            })

        })
    })
    describe("PATCH /api/articles/:article_id",()=>{
        test("Status Code: 200 - Should update the correct votes(1) in specific article id",()=>{
            return request(app)
            .patch("/api/articles/1")
            .send({
                inc_votes : 1
            })
            .expect(200)
            .then(({body})=>{
                expect(body.article.votes).toBe(101)
            })
        })
        test("Status Code: 200 - Should update the correct votes(-100) in specific article id",()=>{
            return request(app)
            .patch("/api/articles/1")
            .send({
                inc_votes : -100
            })
            .expect(200)
            .then(({body})=>{
                expect(body.article.votes).toBe(0)
            })
        })
        test("Status Code: 400 - Should respond with appropriate error code and message if user inputs invalid article ID",()=> {
            return request(app)
            .patch("/api/articles/one")
            .send({
                inc_votes: 5
            })
            .expect(400)
            .then(({ body })=>{
                expect(body.msg).toBe("Bad Request")
            })
        })
        test("Status Code: 404 - Should respond with appropriate error code and message if user inputs valid but non-existent article ID",()=> {
            return request(app)
            .patch("/api/articles/999")
            .send({
                inc_votes: 5
            })
            .expect(404)
            .then(({ body })=>{
                expect(body.msg).toBe("Article Not Found")
            })
        })
        test("Status Code: 400 - Should respond with appropriate error code and message if inc_votes is empty",()=> {
            return request(app)
            .patch("/api/articles/1")
            .send({})
            .expect(400)
            .then(({ body })=>{
                expect(body.msg).toBe("Missing column")
            })
        })
    })
    
})