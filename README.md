# Northcoders News API

For instructions, please head over to [L2C NC News](https://l2c.northcoders.com/courses/be/nc-news).

-------- Welcome to my NC-News Repo --------
Link to hosted version: https://nc-news-h1gn.onrender.com 
use /api to retrieve endpoints that are available

    Overview:
Welcome to the Northcoders News API project!! We are building an API which programmatically accesses application data using HTTP methods such as: GET, POST, PATCH, DELETE.
This would then query the SQL statement with the correct method in our back-end service and retrieve the correct data.

Instructions:
How to clone project:
    Within terminal: git clone <url>
        Example: git clone: https://github.com/sajjmoSD/nc-news.git
Then you can 'cd' into the directory and open the project by prompting the 'code .' command.

How to install dependencies:
    Dev Dependencies:
        jest: npm install --save-dev jest (installs as a developer dependency)
        jest-extended: npm i jest-extended
        supertest:  npm i supertest
    Dependencies:
        dotenv: npm i dotenv
        express: npm install express
        fs: npm i fs
        jest-sorted: npm i jest-sorted
        pg: npm install pg
        husky: npm i husky
        pg-format: npm i pg-format

Seeding Database / Set-up:
    Initialize the setup for database by prompting -
        npm run setup-dbs
    Seeding -
        npm run seed
    Testing -
        npm run test
        (to run specific file you can add file name at end of test
        Example: npm run test app.test.js  )
    Hosting - 
        npm run seed-prod 
        (before running HOSTING prompt please review the .env file)

Creating .env.* files:
    Test Env:
        Create a new file - .env.test
            Inside file:
                PGDATABASE= <databaseName>.test
            (Connects to test database)
            (To test our program!)
    Development Env:
        Create a new file - .env.development
            Inside file:
                PGDATABASE=<databaseName>
                (When hosting application
                the dev data is used)
    Production Env:
        Create new file - .env.production
            Inside File:
                PGDATABASE: <url> (From Elephant SQL)

Versions of Node.js AND Postgres:
    Node.js: LTS - 14.x or 16.x
    Postgres: 13.x (most common version)
    



