import express from 'express';
import * as userModel from "../model/userModel"
import bcrypt from 'bcrypt';
import * as productModel from '../model/productModel';

const getAllUsers = async (req, res) => {
  let users = await userModel.getAllUser();
  return res.status(200).json({
    errCode: 1,
    message: "Success",
    users: users
  });
}

const detailUser = async (req, res) => {
  let user = req.params.user;
  let data = await userModel.detailUser(user);
  return res.status(200).json({
    errCode: 1,
    message: "Success",
    users: data
  });
}

const saltRounds = 10; // Số vòng băm mật khẩu

const createUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Kiểm tra nếu thiếu giá trị cần thiết
    if (!username || !password) {
      return res.status(400).json({
        errCode: 2,
        message: "Missing required fields: username or password",
      });
    }

    // Kiểm tra user có tồn tại không
    let existingUser = await userModel.getUserByUsername(username);
    if (existingUser) {
      return res.status(400).json({
        errCode: 1,
        message: "User already exists",
      });
    }

    // Băm mật khẩu
    let hashedPassword = await bcrypt.hash(password, saltRounds);

    // Gọi model để thêm user
    let newUser = await userModel.createUser({
      username: username,
      password: hashedPassword,
    });

    // Trả dữ liệu thành công cho API
    return res.status(200).json({
      errCode: 0,
      message: "User created successfully",
      user: newUser,
    });

  } catch (error) {
    // Trả dữ liệu lỗi cho API
    return res.status(500).json({
      errCode: 3,
      message: "Internal server error",
    });
  }
}
const updateUser = async (req, res) => {
    try {
      const { username, newData } = req.body;
  
      // Kiểm tra nếu thiếu giá trị cần thiết
      if (!username || !newData) {
        return res.status(400).json({
          errCode: 2,
          message: "Missing required fields: username or new data",
        });
      }
  
      // Kiểm tra user có tồn tại không
      let existingUser = await userModel.getUserByUsername(username);
      if (!existingUser) {
        return res.status(404).json({
          errCode: 1,
          message: "User not found",
        });
      }
  
      // Thực thi cập nhật thông tin người dùng
      let updatedUser = await userModel.updateUser(username, newData);
  
      // Trả dữ liệu thành công cho client
      return res.status(200).json({
        errCode: 0,
        message: "User updated successfully",
        user: updatedUser,
      });
  
    } catch (error) {
      // Trả dữ liệu lỗi cho API
      return res.status(500).json({
        errCode: 3,
        message: "Internal server error",
      });
    }
  }
  const delUser = async (req, res) => {
    try {
      const { username } = req.body;
  
      // Kiểm tra nếu thiếu giá trị cần thiết
      if (!username) {
        return res.status(400).json({
          errCode: 2,
          message: "Missing required field: username",
        });
      }
  
      // Kiểm tra user có tồn tại không
      let existingUser = await userModel.getUserByUsername(username);
      if (!existingUser) {
        return res.status(404).json({
          errCode: 1,
          message: "User not found",
        });
      }
  
      // Thực thi model xóa người dùng
      let deletedUser = await userModel.deleteUser(username);
  
      // Trả dữ liệu thành công cho client
      return res.status(200).json({
        errCode: 0,
        message: "User deleted successfully",
        user: deletedUser,
      });
  
    } catch (error) {
      // Trả dữ liệu lỗi cho API
      return res.status(500).json({
        errCode: 3,
        message: "Internal server error",
      });
    }
  }
  const login = async (req, res) => {
    const { username, password } = req.body; // Nhận username và password từ body yêu cầu
  
    // Kiểm tra xem username và password có được cung cấp không
    if (!username || !password) {
      return res.status(400).json({
        errCode: 1,
        message: "Thiếu username hoặc password",
      });
    }
  
    try {
      // Kiểm tra xem user có tồn tại trong hệ thống không
      const user = await userModel.findUserByUsername(username);
      
      // Nếu không tìm thấy user
      if (!user) {
        return res.status(404).json({
          errCode: 1,
          message: "User không tồn tại",
        });
      }
  
      // Kiểm tra mật khẩu (giả sử bạn có một hàm kiểm tra mật khẩu)
      const isPasswordValid = await userModel.verifyPassword(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({
          errCode: 1,
          message: "Mật khẩu không đúng",
        });
      }
  
      // Nếu login thành công
      return res.status(200).json({
        errCode: 0,
        message: "Đăng nhập thành công",
        user: {
          id: user.id,
          username: user.username,
          // Thêm các thông tin khác nếu cần
        }
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        errCode: 1,
        message: "Đã xảy ra lỗi khi đăng nhập",
      });
    }
  };
  const getAllProduct = async (req, res) => {
    let products = await productModel.getAllProduct();
    return res.status(200).json({
      errCode: 1,
      message: "Success",
      sanpham: products
    });
  }  
  const getAllCategories = async (req, res) => {
    let categories = await productModel.getAllCategories();
    return res.status(200).json({
      errCode: 1,
      message: "Success",
      nhom: categories
    });
  } 
export default { getAllUsers, detailUser, createUser, updateUser, delUser, login, getAllProduct, getAllCategories};