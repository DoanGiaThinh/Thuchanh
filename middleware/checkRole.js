
const checkRole = (action) => {
    return (req, res, next) => {
        const user = req.session.user; // Assume user info is stored in session

        if (!user) {
            // If user is not logged in
            return res.status(403).send("Access denied. You need to be logged in.");
        }

        switch (action) {
            case 'create':
                if (user.role === 'admin') {
                    return next(); // Allow if admin
                }
                return res.status(403).send("Access denied. Only admins can create users.");
            case 'edit':
                if (user.role === 'admin' || user.id === req.params.id) {
                    return next(); // Allow if admin or user is editing their own account
                }
                return res.status(403).send("Access denied. You can only edit your own account.");
            case 'delete':
                if (user.role === 'admin' || user.id === req.params.id) {
                    return next(); // Allow if admin or user is deleting their own account
                }
                return res.status(403).send("Access denied. You can only delete your own account.");
            case 'view':
                return next(); // Allow view for everyone
            default:
                return res.status(400).send("Invalid action");
        }
    };
};

export default checkRole;