import pool from '../../infraestructure/database/database'

const createEvent = async (event) =>{
    return (await pool).query('INSERT INTO events SET?',event)
}

const getAll = async () =>{
    return (await pool).query('SELECT * FROM events')
}

const getById = async (id) =>{
    return  (await pool).query('SELECT * FROM events WHERE id_event = ?',id)
}

const editEvent = async (event, id) =>{
    return (await pool).query('UPDATE events SET ? WHERE id_event = ?',[event,id])
}

const deleteEvent = async (id) =>{
    return (await pool).query('DELETE FROM events WHERE id_event =?',[id])
}

const getAllAddresses = async () =>{
    return (await pool).query(`SELECT id_event, CONCAT(e.address,' ', c.name ,' ', s.state_name,' ', co.country_name)  full_address `+ 
    `FROM events e JOIN cities c ON e.id_city = c.id_city JOIN states s ON c.id_state = s.id_state `+
    `JOIN countries co ON s.id_country = co.id_country` )
}

module.exports = {
    createEvent, getAll, getById,editEvent,deleteEvent, getAllAddresses
}