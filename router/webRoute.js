import express from 'express';
import { getHomePage } from '../controller/HomeController';
import { getAboutPage } from '../controller/AboutController';
import { getContactPage } from '../controller/ContactController';

const router = express.Router();

const initWebRouter = (app) => {
    router.get("/", getHomePage);
    router.get("/about", getAboutPage);
    router.get("/contact", getContactPage);

    return app.use("/", router);
};

export default initWebRouter;
