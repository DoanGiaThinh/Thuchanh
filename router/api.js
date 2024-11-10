import express from 'express'
import AuthController from '../controller/AuthController'

const router = express.Router()
const initAPIRoute = (app) => {
  router.get('/get-all-users', AuthController.getAllUsers)
  router.get('/detail-user/:user', AuthController.detailUser)
  router.post('/createUser', AuthController.createUser);
  router.put('/updateUser', AuthController.updateUser);
  router.delete('/deleteUser', AuthController.delUser);
  router.post('/login', AuthController.login);
  router.get('/listproduct', AuthController.getAllProduct);
  router.get('/listcategories',AuthController.getAllCategories);

  return app.use("/api/v1", router)
}

export default initAPIRoute