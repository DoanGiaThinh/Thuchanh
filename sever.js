import express from 'express';
import dontenv from 'dotenv/config';
import viewEngine from './viewEngine.js';
import initWebRouter from './router/webRoute.js';
import session from 'express-session';
import RedisStore from 'connect-redis';
import { createClient } from 'redis';
import bodyParser from 'body-parser';
import initAPIRoute from './router/api';

const app = express();
const port = process.env.PORT || 1234;
//const cors = require('cors');



let redisClient = createClient()
redisClient.connect().catch(console.error)

let redisStore = new RedisStore({
  client: redisClient,
  prefix: "myapp:",
})

app.use(session({
  store: redisStore,
  secret: 'keyboard dog',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}))

//app.use(cors())

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin',process.env.REACT_URL);

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

viewEngine(app);
initWebRouter(app);
initAPIRoute(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
