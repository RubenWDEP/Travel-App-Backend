# App Back-end documentation

Please, read this documentation before running the app for first time
This API is aimed to manage a Travel Social Network where users can recommend and comment locations to visit.

## Previous configuration

To run this API, user must create and configure a database. [MySQL](https://dev.mysql.com/downloads/installer/) is the database management system which has been used for the app development.  
Once database is created:

• run your code editor
• execute `npm install` command
• create a `.env` file and fill it with database parameters(refer to file “env.example”)
• execute `node ./db/initDB.js`

### Non-logged in users

- User can search recommendations by location or category
- User can order results by “latest”, “ascending rating” or “descending rating”
- User can register in the app and then log in

### Logged in users

- User can search recommendations by location or category
- User can order results by “latest”, “ascending rating” or “descending rating”
- User can rate recommendations by means of a star-rating system
- User can comment recommendations of other users
- User can post recommendations
- User can delete its own posts
