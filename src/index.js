const express = require('express');
const bodyParser = require('body-parser');

const { PORT } = require('./config/ServerConfig')

const ApiRoutes = require('./routes/index')

const { User, Role } = require('./models/index')

const app = express();

const prepareAndStartServer = () => {

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))


    app.use('/api', ApiRoutes)
    app.listen(PORT, async () => {
        console.log(`Server started at ${PORT}`)
        const u1 = await User.findByPk(3);
        const r1 = await Role.findByPk(1);
        u1.addRole(r1);

    })
}

prepareAndStartServer();