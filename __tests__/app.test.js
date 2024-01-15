const request = require("supertest");
const app = require("../app.js")
const db = require("../db/connection.js");
const seed = require("../db/seeds/seed.js")
const data = require("../db/data/test-data");
const endpointFormat = {
    "GET /api": {
      "description": "serves up a json representation of all the available endpoints of the api"
    },
    "GET /api/topics": {
      "description": "serves an array of all topics",
      "queries": [],
      "exampleResponse": {
        "topics": [{ "slug": "football", "description": "Footie!" }]
      }
    },
    "GET /api/articles": {
      "description": "serves an array of all articles",
      "queries": ["author", "topic", "sort_by", "order"],
      "exampleResponse": {
        "articles": [
          {
            "title": "Seafood substitutions are increasing",
            "topic": "cooking",
            "author": "weegembump",
            "body": "Text from the article..",
            "created_at": "2018-05-30T15:59:13.341Z",
            "votes": 0,
            "comment_count": 6,
          }
        ]
      }
    }
  } //So i can match the return object to skeleton object
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
})