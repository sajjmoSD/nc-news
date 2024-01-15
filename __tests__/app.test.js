const request = require("supertest");
const app = require("../app.js")
const db = require("../db/connection.js");
const seed = require("../db/seeds/seed.js")
const data = require("../db/data/test-data");
const endpointFormat = require("../endpoints.json") //So i can match the return object to skeleton object
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
                const articleData = body
                expect(articleData).toMatchObject(
                    {
                        title: "Living in the shadow of a great man",
                        topic: "mitch",
                    }
                )
            })
        })
        test("Status Code: 200 and should return the correct article by id (2)",()=>{
            return request(app)
            .get("/api/articles/2")
            .expect(200)
            .then(({body})=>{
                const articleData = body
                console.log(articleData,"<Test")
                expect(articleData).toMatchObject(
                    {
                        title: "Sony Vaio; or, The Laptop",
                        topic: "mitch",
                    }
                )
            })
        })
        test("Status Code: 404 - sends appropriate status code and error message when given a valid but non-existent id",()=>{
            return request(app)
            .get("/api/articles/999")
            .expect(404)
            .then((response)=>{
                expect(response.body.msg).toBe("Not Found")
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
})