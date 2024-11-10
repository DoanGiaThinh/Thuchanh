import pool from "../connectDB";
import connection from "../connectDB";

const getAllUser = async () => {
    const [rows, fields] = await pool.execute('SELECT * FROM `users`');
    return rows;
}

const createUser = async (
    username,
    password,
    fullname,
    address,
    sex,
    email,
    role = 'user'
) => {
    const [result] = await connection.execute(
        'INSERT INTO users (username, password, fullname, address, sex, email, role) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [username, password, fullname, address, sex, email, role]
    );
    return result.insertId;
};


const getUserById = async (id) => {
    const [rows] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
};

const updateUser = async (id, username, fullname, address, sex, email) => {
    const [result] = await pool.execute(
        'UPDATE users SET username = ?, fullname = ?, address = ?, sex = ?, email = ? WHERE id = ?',
        [username, fullname, address, email, id]
    );
    return result;
};

const deleteUser = async (id) => {
    const [result] = await pool.execute('DELETE FROM users WHERE id = ?', [id]);
    return result;
};

const findByUsername = async (username) => {
    const [rows] = await connection.execute('SELECT * FROM users WHERE username = ?', [username]);
    return rows[0]; // Return the user if found
  };
export default { getAllUser, createUser, getUserById, updateUser, deleteUser, findByUsername };
