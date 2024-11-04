import express from 'express';
import { getHomePage } from '../controller/HomeController';
import { getAboutPage } from '../controller/AboutController';
import { getContactPage } from '../controller/ContactController';
import UserController from '../controller/UserController';
import checkRole from '../middleware/checkRole';
import checkLogin from '../middleware/auth';

const router = express.Router();

const initWebRouter = (app) => {
    router.get("/", getHomePage);
    router.get("/about", getAboutPage);
    router.get("/contact", getContactPage);
    router.get("/list", UserController.getListPage);
    router.get('/login', UserController.getLogin);
    router.post('/login', UserController.loginUser);
    router.get('/register', UserController.getRegister);
    router.post('/register', UserController.registerUser);
    router.post('/logout', UserController.logoutUser);

    router.get('/detail/:id', checkLogin, checkRole('view'), UserController.viewUserDetails);
    router.get('/edit/:id', checkLogin, checkRole('edit'), UserController.editUser);
    router.post('/update/:id',checkLogin, checkRole('edit'), UserController.updateUser);
    router.post('/delete/:id', checkLogin, checkRole('delete'), UserController.deleteUser);
    router.post('/createUser', checkLogin, UserController.createUser);
    
    return app.use("/", router);
};

export default initWebRouter;
