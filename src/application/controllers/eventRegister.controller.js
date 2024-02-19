import {register,cancelRegister,getByUser,
        getByEvent,getUsersQuantityInEvent,
        getAllEventsWithRegisters} from '../../domain/models/EventRegister'
import {getById , getAll} from '../../domain/models/Event'
import {findById} from '../../domain/models/User'

const registerEvent = async(req,res)=>{
    try{
        const user = await findById(req.body.id_user)
        if(user[0].length>0){
            const event = await getById(req.body.id_event)
            if(event[0].length>0){
                await register(req.body)
                res.status(201).json({message:'Evento creado'})
            }else{
                res.status(404).json({message:'Evento no encontrado'})
            }
        }else{
            res.status(404).json({message:'Usuario no encontrado'})
        }
    }catch{
        res.status(404).json({message:'Evento no creado'})
    }
}

const cancelRegisterEvent = async(req,res)=>{
    try{
        const user = await findById(req.body.id_user)
        if(user[0].length>0){
            const event = await getById(req.body.id_event)
            if(event[0].length>0){
                await cancelRegister(req.body)
                res.status(201).json({message:'Registro cancelado'})
            }else{
                res.status(404).json({message:'Evento no encontrado'})
            }
        }else{
            res.status(404).json({message:'Usuario no encontrado'})
        }
    }catch{
        res.status(404).json({message:'Evento no cancelado'})
    }
}

const getEventsByUser = async (req,res)=>{
    try{
        const user = await findById(req.params.id)
        if(user[0].length>0){
            let query = await getByUser(req.params.id)
            res.status(200).json(query[0])
        }else{
            res.status(404).json({message:'Usuario no encontrado'})
        }
    }catch{
        res.status(404).json({message:'No se encontraron eventos'})
    }
}

const getUsersByEvent = async (req,res)=>{
    try{
        const event = await getById(req.params.id)
        if(event[0].length>0){
            let query = await getByEvent(req.params.id)
            res.status(200).json(query[0])
        }else{
            res.status(404).json({message:'Evento no encontrado'})
        }
    }catch{
        res.status(404).json({message:'No se encontraron usuarios'})
    }
}

const reportUsersByDay = async (req,res)=>{
    try{
        let query = await getAllEventsWithRegisters()
        const matrix = [];
        await createMatrix(query, matrix)

        let days = fillReport(matrix)
        res.status(200).json(days)
    }catch{
        res.status(404).send('Reporte no generado')
    }

    
}

const createReportDaysList = () => {
    return [
        { day: 'Domingo', assistants: 0 },
        { day: 'Lunes', assistants: 0 },
        { day: 'Martes', assistants: 0 },
        { day: 'Miércoles', assistants: 0 },
        { day: 'Jueves', assistants: 0 },
        { day: 'Viernes', assistants: 0 },
        { day: 'Sábado', assistants: 0 }
    ]
}

const createMatrix = async  (query, matrix) => {
    for (const item of query[0]) {
        let row = []
        let day = item.date.getDay()
        let queryQuantity = await getUsersQuantityInEvent(item.id_event)
        let quantity = queryQuantity[0][0].quantity
        for (let i = 0; i < 7; i++) {
            i == day ? row.push(quantity) : row.push(0)
        }
        matrix.push(row)
    }
}

const fillReport = (matrix) =>{
    let days = createReportDaysList()
    for (let i = 0; i < matrix[0].length; i++) {
        let result = 0
        for (let j = 0; j < matrix.length; j++) {
            result += matrix[j][i]
        }
        days[i].assistants = result
    }
    return days
}


module.exports = {
    registerEvent,cancelRegisterEvent,getEventsByUser, getUsersByEvent,reportUsersByDay
}



