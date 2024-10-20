import userModel from "../model/userModel";

const getListPage = async (req, res) => {
    try {
        
        const users = await userModel.getAllUser();
        
        
        return res.render('layout/default', {
            title: "Home Page",
            data: { 
                path: "views/users/list",
                props: { users: users }
            }
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).send("An error occurred while fetching users.");
    }
};

const createUser = async (req, res) => {
    const { username, fullname, address, email } = req.body;
    try {
        const newUserId = await userModel.createUser(username, fullname, address, email);
        return res.redirect('/list');
    } catch (error) {
        console.error('Error adding user:', error);
        return res.status(500).send('Error adding user');
    }
}

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

export default {getListPage, createUser, viewUserDetails, editUser, updateUser, deleteUser }
