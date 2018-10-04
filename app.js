//////// DEPENDENCIES, MODULES /////////////////////////

const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

const Knex = require('knex');
const { Model } = require('objection');

const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger/swagger.json')

const config = require('./config/config');




//////// MIDDLE-WARE CONFIGURATIONS /////////////////////

//// allow body-parser to parse request.body ////
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//// allow cross-origin-resource-sharing ////
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});




///////////// DATABASE CONNECTION ////////////////////////

const knex = Knex({
  client: 'postgresql',
  searchPath: ["obj_schema"],
  connection: {
    host: config.PGHOST,
    port: config.PGPORT,
    user: config.PGUSER,
    password:  config.PGPASSWORD,
    database: config.PGDATABASE
  },
  pool: {
    min: 2,
    max: 10
  }
});

Model.knex(knex);




//////////// START SERVER ON ENVIRONMENT PORT /////////////////

const port = config.PORT

app.set('port', port)

app.listen(app.get('port'), () => {
  console.log(`\n\t >>> Objection.js Server running on [PORT: ${app.get('port')}]` )
})






///////////////// ROUTES ////////////////////////////////////

app.get('/', (req, res) => res.send('Hello Spen!'))

// //// resource routes ////
// const userRoutes = require('./routes/userRoutes')
// const orgsRoutes = require('./routes/orgsRoutes')
// const rolesRoutes = require('./routes/rolesRoutes')
// const usersRolesRoutes = require('./routes/usersRolesRoutes')
// const orgsRolesRoutes = require('./routes/orgsRolesRoutes')
//
// app.use('/', userRoutes)
// app.use('/', orgsRoutes)
// app.use('/', rolesRoutes)
// app.use('/', usersRolesRoutes)
// app.use('/', orgsRolesRoutes)
//
//
// //// seed routes ////
// const seedRoutes = require('./routes/seedRoutes')
// app.use('/', seedRoutes)

//// swagger route ////
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));







// END
