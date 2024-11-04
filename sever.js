import express from 'express';
import dontenv from 'dotenv/config';
import viewEngine from './viewEngine.js';
import initWebRouter from './router/webRoute.js';
import session from 'express-session';
import RedisStore from 'connect-redis';
import { createClient } from 'redis';
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 3000;



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

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

  // app.use(express.json());
  // app.use(express.urlencoded({ extended: true }));
  
  viewEngine(app);
  initWebRouter(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
