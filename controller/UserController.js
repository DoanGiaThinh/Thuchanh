import userModel from "../model/userModel";
import bcrypt from 'bcrypt';

const getListPage = async (req, res) => {
    try {
        
        const users = await userModel.getAllUser();
        
        return res.render('layout/default', {
            title: "Home Page",
            data: { 
                path: "views/users/list",
                props: { users: users }      
            },
            user: req.session.user
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).send("An error occurred while fetching users.");
    }
};


const createUser = async (req, res) => {
    const { username, password, confirmPassword, fullname, address, sex, email, role} = req.body;

    // Kiểm tra xem mật khẩu và xác nhận mật khẩu có khớp không
    if (password !== confirmPassword) {
        return res.status(400).send('Mật khẩu và xác nhận mật khẩu không khớp.');
    }

    try {
        // Băm mật khẩu
        const hashedPassword = await bcrypt.hash(password, 10);

        // Tạo người dùng mới với mật khẩu đã băm
        const newUserId = await userModel.createUser(username, hashedPassword, fullname, address, sex, email, role);
        return res.redirect('/list');
    } catch (error) {
        console.error('Lỗi khi thêm người dùng:', error);
        return res.status(500).send('Lỗi khi thêm người dùng');
    }
};

const viewUserDetails = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await userModel.getUserById(userId);
        if (user) {
            return res.render('users/detail', { user });
        } else {
            return res.status(404).send('Không tìm thấy User');
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('Server error');
    }
};

const editUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await userModel.getUserById(userId);
        if (user) {
            return res.render('users/edit', { user });
        } else {
            return res.status(404).send('User not found');
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('Server error');
    }
};


const updateUser = async (req, res) => {
    const userId = req.params.id;
    const { username, fullname, address, email } = req.body; 

    try {
       
        const user = await userModel.getUserById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        
        const result = await userModel.updateUser(userId, username, fullname, address, email);

        if (result.affectedRows > 0) {
            
            return res.redirect('/list');
        } else {
           
            return res.status(400).send('No changes made');
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('Server error');
    }
};



const deleteUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const result = await userModel.deleteUser(userId);
        if (result.affectedRows > 0) {
            return res.redirect('/list');
        } else {
            return res.status(400).send('Failed to delete user');
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('Server error');
    }
};
const getLogin = (req, res) => {
    //Kiểm tra nếu người dùng đã đăng nhập, chuyển hướng tới trang khác
    if (req.session.user) {
        return res.redirect('/list');
    }

    // Hiển thị form login với biến message trống (null) nếu không có lỗi
    return res.render('login', { message: null });
};

const loginUser = async (req, res) => {
    const { username, password } = req.body;

    // Lấy người dùng từ cơ sở dữ liệu theo username
    const user = await userModel.findByUsername(username);

    if (!user) {
        // Truyền thông báo lỗi nếu username không đúng
        return res.status(400).render('login', { message: 'Tên đăng nhập sai' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        // Truyền thông báo lỗi nếu password không đúng
        return res.status(400).render('login', { message: 'Sai thông tin tài khoản hoặc mật khẩu' });
    }

    // Lưu thông tin vào session và chuyển hướng đến trang khác nếu đăng nhập thành công
    req.session.user = {
        id: user.id,
        username: user.username,
        fullname: user.fullname
    };

    return res.redirect('/');
};

const logoutUser = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error(err);
            return res.status(500).send('Unable to log out. Please try again later.');
        }
        res.redirect('/'); 
    });
};

const getRegister = (req, res) => {
    return res.render('register', { message: null });
};

const registerUser = async (req, res) => {
    const { username, password, confirmPassword, fullname, address, sex, email } = req.body; // Loại bỏ 'role'

    // Kiểm tra nếu mật khẩu và xác nhận mật khẩu khớp
    if (password !== confirmPassword) {
        return res.status(400).render('register', { message: 'Mật khẩu không khớp' });
    }

    try {
        // Băm mật khẩu
        const hashedPassword = await bcrypt.hash(password, 10);

        // Đặt vai trò mặc định là 'user'
        const role = 'user';

        // Lưu người dùng vào cơ sở dữ liệu
        await userModel.createUser(username, hashedPassword, fullname, address, sex, email, role);
        
        return res.redirect('/login'); // Chuyển hướng đến trang đăng nhập
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).render('register', { message: 'Lỗi khi đăng ký người dùng' });
    }
};


export default { getListPage, createUser, viewUserDetails, editUser, updateUser, deleteUser, loginUser, getLogin, logoutUser, getRegister, registerUser }

