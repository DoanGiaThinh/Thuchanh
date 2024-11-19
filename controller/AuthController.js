import * as productModel from "../model/productModel";
import * as userModel from "../model/userModel";
import bcrypt from 'bcrypt';

const saltRounds = 10; // Số vòng băm mật khẩu

// Lấy tất cả người dùng
const getAllUsers = async (req, res) => {
  let users = await userModel.getAllUser();
  return res.status(200).json({
    errCode: 1,
    message: "Success",
    users: users
  });
};

// Lấy chi tiết người dùng
const detailUser = async (req, res) => {
  let user = req.params.user;
  let data = await userModel.detailUser(user);
  return res.status(200).json({
    errCode: 1,
    message: "Success",
    users: data
  });
};

// Tạo người dùng mới
const createUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        errCode: 2,
        message: "Missing required fields: username or password",
      });
    }

    let existingUser = await userModel.getUserByUsername(username);
    if (existingUser) {
      return res.status(400).json({
        errCode: 1,
        message: "User already exists",
      });
    }

    let hashedPassword = await bcrypt.hash(password, saltRounds);

    let newUser = await userModel.createUser({
      username: username,
      password: hashedPassword,
    });

    return res.status(200).json({
      errCode: 0,
      message: "User created successfully",
      user: newUser,
    });

  } catch (error) {
    return res.status(500).json({
      errCode: 3,
      message: "Internal server error",
    });
  }
};

// Cập nhật người dùng
const updateUser = async (req, res) => {
  try {
    const { username, newData } = req.body;
    if (!username || !newData) {
      return res.status(400).json({
        errCode: 2,
        message: "Missing required fields: username or new data",
      });
    }

    let existingUser = await userModel.getUserByUsername(username);
    if (!existingUser) {
      return res.status(404).json({
        errCode: 1,
        message: "User not found",
      });
    }

    let updatedUser = await userModel.updateUser(username, newData);

    return res.status(200).json({
      errCode: 0,
      message: "User updated successfully",
      user: updatedUser,
    });

  } catch (error) {
    return res.status(500).json({
      errCode: 3,
      message: "Internal server error",
    });
  }
};

// Xóa người dùng
const delUser = async (req, res) => {
  try {
    const { username } = req.body;
    if (!username) {
      return res.status(400).json({
        errCode: 2,
        message: "Missing required field: username",
      });
    }

    let existingUser = await userModel.getUserByUsername(username);
    if (!existingUser) {
      return res.status(404).json({
        errCode: 1,
        message: "User not found",
      });
    }

    let deletedUser = await userModel.deleteUser(username);

    return res.status(200).json({
      errCode: 0,
      message: "User deleted successfully",
      user: deletedUser,
    });

  } catch (error) {
    return res.status(500).json({
      errCode: 3,
      message: "Internal server error",
    });
  }
};

// Đăng nhập người dùng
const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      errCode: 1,
      message: "Thiếu username hoặc password",
    });
  }

  try {
    const user = await userModel.findByUsername(username);
    if (!user) {
      return res.status(404).json({
        errCode: 1,
        message: "User không tồn tại",
      });
    }

    const isPasswordValid = await userModel.verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        errCode: 1,
        message: "Mật khẩu không đúng",
      });
    }

    return res.status(200).json({
      errCode: 0,
      message: "Đăng nhập thành công",
      user: {
        id: user.id,
        username: user.username,
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

// Lấy tất cả sản phẩm
const getAllProduct = async (req, res) => {
  let products = await productModel.getAllProduct();
  return res.status(200).json({
    errCode: 1,
    message: "Success",
    sanpham: products
  });
}

// Lấy tất cả nhóm sản phẩm
const getAllCategories = async (req, res) => {
  let categories = await productModel.getAllCategories();
  return res.status(200).json({
    errCode: 1,
    message: "Success",
    nhom: categories
  });
}

// Lấy sản phẩm theo nhóm (category) - API mới
const getListProductByCategoryApi = async (req, res) => {
  try {
    const { category } = req.query;  // Lấy id nhóm từ query string
    if (!category) {
      return res.status(400).json({
        errCode: 2,
        message: "Missing 'category' parameter"
      });
    }

    const products = await productModel.getProductByCategories(category);

    if (products.length === 0) {
      return res.status(404).json({
        errCode: 3,
        message: "No products found for this category"
      });
    }

    return res.status(200).json({
      errCode: 0,
      message: "Success",
      sanpham: products  // Trả về sản phẩm theo nhóm
    });
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return res.status(500).json({
      errCode: 4,
      message: "An error occurred while fetching products by category: " + error.message
    });
  }
};
// Lấy chi tiết sản phẩm
const detailProduct = async (req, res) => {
  let products = req.params.products;
  let data = await productModel.getProductById(products);
  return res.status(200).json({
    errCode: 1,
    message: "Success",
    sanpham: data
  });
};

//Đăng ký người dùng
const handleRegister = async (req, res) => {
  try {
    if (!req.body.username || !req.body.password || !req.body.email) {
      return res.status(400).json({
        errCode: 1,
        message: "Missing required parameters",
        data: '',
      });
    }
    let data = await userModel.createUser(req.body);
    return res.status(200).json({
      errCode: 0,
      message: "User created successfully",
      data: '',
    });

  } catch (error) {
    return res.status(500).json({
      message: 'erro',
      errCode: '-1',
      data: '',
    })
  }

  console.log("oke r đó", req.body);
}
export default { getAllUsers, detailUser, createUser, updateUser, delUser, login, getAllProduct, getAllCategories, getListProductByCategoryApi, detailProduct, handleRegister };
