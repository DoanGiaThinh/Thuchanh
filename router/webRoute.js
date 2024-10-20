import express from 'express';
import { getHomePage } from '../controller/HomeController';
import { getAboutPage } from '../controller/AboutController';
import { getContactPage } from '../controller/ContactController';
import UserController from '../controller/UserController';
const router = express.Router();

const initWebRouter = (app) => {
    router.get("/", getHomePage);
    router.get("/about", getAboutPage);
    router.get("/contact", getContactPage);
    router.get("/list", UserController.getListPage);
    router.post("/createUser", UserController.createUser);
    router.get('/detail/:id', UserController.viewUserDetails);
    router.get('/edit/:id', UserController.editUser);
    router.post('/update/:id', UserController.updateUser);
    router.post('/delete/:id', UserController.deleteUser);
    return app.use("/", router);
};

export default initWebRouter;
