const express = require('express');
const bodyParser = require('body-parser');

const { PORT } = require('./config/ServerConfig')

const ApiRoutes = require('./routes/index')

// const UserRepository = require('./repository/user-repository')

const app = express();

const prepareAndStartServer = () => {

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))


    app.use('/api', ApiRoutes)
    app.listen(PORT, async () => {
        // const userRepo = new UserRepository();
        // const user = await userRepo.getById(1);
        // console.log(user);
        console.log(`Server started at ${PORT}`)
    })
}

prepareAndStartServer();