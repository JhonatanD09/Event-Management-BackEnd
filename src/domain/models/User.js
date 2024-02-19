const bcrypt = require("bcryptjs");
import pool from '../../infraestructure/database/database'

const createUser = async (user)=>{
    return (await pool).query('INSERT INTO USERS SET ?',user)
}

const findById = async (id)=>{
    return (await pool).query('SELECT * FROM users WHERE id_user = ?', id)
}

const findByEmail = async (email)=>{
    return (await pool).query('SELECT * FROM users WHERE email = ?', email)
}

const editUser = async (user,id)=>{
    return (await pool).query('UPDATE users SET ? WHERE id_user = ?', [user,id]).then().catch((err)=>{console.log(err)})
}

const deleteUser = async (id)=>{
    return (await pool).query('DELETE FROM users WHERE id_user = ?', id)
}


const encryptPass = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  };

const comparePass = async (password, receivedPass) => {
    return await bcrypt.compare(password, receivedPass);
};

module.exports = {
    createUser,
    encryptPass,
    comparePass,
    findById,
    editUser,
    deleteUser,
    findByEmail
}