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

const getCompleteAddress = async(id_user)=>{
    return (await pool).query(`SELECT CONCAT(u.address,' ', c.name ,' ', s.state_name,' ', co.country_name)  full_address `+
    `FROM users u JOIN cities c ON u.id_city = c.id_city JOIN states s ON c.id_state = s.id_state `+
    `JOIN countries co ON s.id_country = co.id_country WHERE u.id_user = ?`, [id_user])
}

const encryptPass = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  };

const comparePass = async (password, receivedPass) => {
    return await bcrypt.compare(password, receivedPass);
};

const createDefaulUser = async () =>{
    const verifyUsers = (await pool).query('SELECT * FROM users ')
    const userDef = {
        name: 'Admin',
        email: 'Admin@gmail.com',
        password: await encryptPass('admin'),
        address: 'calle 12',
        phone_number: '3203961541',
        id_rol: 1,
        id_city: 1,
    }
    verifyUsers.then(async (res)=>{
        if(res[0].length==0){
            (await pool).query('INSERT INTO users SET? ',[userDef])
        }
    })
}

module.exports = {
    createUser,
    encryptPass,
    comparePass,
    findById,
    editUser,
    deleteUser,
    findByEmail,
    getCompleteAddress,
    createDefaulUser
}