import pool from "../connectDB";
import connection from "../connectDB";

const getAllUser = async () => {
    const [rows, fields] = await pool.execute('SELECT * FROM `users`');
    return rows;
}

const createUser = async (
    username,
    fullname,
    address,
    email
) => {
    const [result] = await connection.execute(
        'INSERT INTO users (username, fullname, address, email) VALUES (?, ?, ?, ?)',
        [username, fullname, address, email]
    );
    return result.insertId;
}

const getUserById = async (id) => {
    const [rows] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
};

const updateUser = async (id, username, fullname, address, email) => {
    const [result] = await pool.execute(
        'UPDATE users SET username = ?, fullname = ?, address = ?, email = ? WHERE id = ?',
        [username, fullname, address, email, id]
    );
    return result;
};

const deleteUser = async (id) => {
    const [result] = await pool.execute('DELETE FROM users WHERE id = ?', [id]);
    return result;
};

export default { getAllUser, createUser, getUserById, updateUser, deleteUser };
