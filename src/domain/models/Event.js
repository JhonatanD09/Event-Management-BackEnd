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

module.exports = {
    createEvent, getAll, getById,editEvent,deleteEvent
}