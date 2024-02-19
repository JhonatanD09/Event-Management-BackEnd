import pool from '../../infraestructure/database/database'

const register = async (data)=>{ 
    return (await pool).query('INSERT INTO register_events SET?',data)
}

const cancelRegister = async (data)=>{
    return (await pool).query('DELETE FROM register_events WHERE id_user = ? AND id_event = ?', [data.id_user, data.id_event])
}

const getByUser = async (id_user)=>{
    return (await pool).query('SELECT e.id_event, e.name , e.description, e.date , e.hour,'+
    ' e.address , c.name , s.state_name, cs.country_name '+
    'FROM register_events re JOIN events e ON re.id_event = e.id_event '+
    ' JOIN cities c ON e.id_city = c.id_city JOIN states s ON c.id_state = s.id_state'+
    ' JOIN countries cs ON s.id_country = cs.id_country WHERE id_user = ?', [id_user])
   
}

const getByEvent = async (id_event)=>{
    return  (await pool).query('SELECT re.id_user, u.name , u.email, u.phone_number ,'+
    ' u.address , c.name , s.state_name, cs.country_name '+
    'FROM register_events re JOIN users u ON re.id_user = u.id_user '+
    ' JOIN cities c ON u.id_city = c.id_city JOIN states s ON c.id_state = s.id_state'+
    ' JOIN countries cs ON s.id_country = cs.id_country WHERE id_event = ?', [id_event])
}

const getUsersQuantityInEvent = async (id_event)=>{
    return  (await pool).query('SELECT count(*) as quantity FROM register_events  WHERE id_event =?', [id_event])
}

module.exports = {
    register,cancelRegister,getByUser,getByEvent, getUsersQuantityInEvent
}