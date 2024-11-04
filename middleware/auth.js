const checkLogin = (req, res, next) => {
    if (req.session && req.session.user) {
        // Nếu người dùng đã đăng nhập, tiếp tục thực hiện request
        return next();
    } else {
        // Nếu chưa đăng nhập, chuyển hướng đến trang login
        return res.redirect('/login');
    }
};

export default checkLogin;