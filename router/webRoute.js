import express from 'express';
import { getHomePage } from '../controller/HomeController';
import { getAboutPage } from '../controller/AboutController';
import { getContactPage } from '../controller/ContactController';
import UserController from '../controller/UserController';
import checkRole from '../middleware/checkRole';
import checkLogin from '../middleware/auth';
import ProductController from '../controller/ProductController';

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
    router.get('/listproduct', ProductController.getListProduct);  // Hiển thị tất cả sản phẩm
    router.get('/listproduct/category', ProductController.getListProductByCt);  // Hiển thị sản phẩm theo nhóm
    router.get('/listcategories', ProductController.getListCategories);  // Hiển thị danh sách nhóm sản phẩm

    // Các route khác
    router.get('/detailproduct/:masp', checkLogin, checkRole('view'), ProductController.getProductDetail);
    router.get('/detail/:id', checkLogin, checkRole('view'), UserController.viewUserDetails);
    router.get('/edit/:id', checkLogin, checkRole('edit'), UserController.editUser);
    router.post('/update/:id', checkLogin, checkRole('edit'), UserController.updateUser);
    router.post('/delete/:id', checkLogin, checkRole('delete'), UserController.deleteUser);
    router.post('/createUser', checkLogin, UserController.createUser);

    return app.use("/", router);
};

export default initWebRouter;
