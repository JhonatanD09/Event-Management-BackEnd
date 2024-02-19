import {register,cancelRegister,getByUser,getByEvent} from '../../domain/models/EventRegister'
import {getById} from '../../domain/models/Event'
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
    console.log('report')
}


module.exports = {
    registerEvent,cancelRegisterEvent,getEventsByUser, getUsersByEvent,reportUsersByDay
}