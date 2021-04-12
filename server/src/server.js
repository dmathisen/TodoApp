const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const logger = require('morgan');
let session = require('express-session');
let grant = require('grant');

const routes = require('./routes');
const { server, oauth } = require('./config');
const apiKeyValidation = require('./apiKeyValidation');
const { startDatabase } = require('./database/mongo');

let app = express();

// OAuth - https://github.com/simov/grant
// connect at http://localhost:4000/connect/google
app.use(session({ secret: 'grant', saveUninitialized: true, resave: false }));
app.use(grant.express({ ...oauth }));


// middleware
app.use(cors());
app.use(helmet());
//app.use(app.oauth.authorize());


// validate api key
app.use('/api', apiKeyValidation);
  

// routes
app.use('/', routes);


// error handling
app.use(function(err, req, res, next){
  res.status(err.status || 500);
  res.send({ error: err.message });
});

  
// 404
app.use(function(req, res){
  res.status(404);
  res.send({ error: "Lame, can't find that" });
});


// db connection and server start
startDatabase().then(async () => {
  app.listen(server.port, () => {
    console.log(`Node.js app is listening at ${server.protocol}://${server.host}:${server.port}`);
  });
});