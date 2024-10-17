import express from 'express';
import dontenv from 'dotenv/config';
import viewEngine from './viewEngine.js';
import initWebRouter from './router/webRoute.js';

const app = express();
const port = process.env.PORT || 3000;


viewEngine(app);


initWebRouter(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
