import {createEvent,getAll, getById,editEvent, deleteEvent} from '../../domain/models/Event'

const addEvent = async(req,res)=>{
    try{
        await createEvent(req.body)
        res.status(201).json({message:'Evento creado'})
    }catch{
        res.status(404).json({message:'Evento no creado'})
    }
}

const getAllEvents = async(req,res)=>{
    try{
        const events = await getAll()
        res.status(200).json(events[0])
    }catch{
        res.status(404).json({message:'No se encontraron eventos'})
    }
}

const getEventById = async(req,res)=>{
    try{
        const event = await getById(req.params.id)
        res.status(200).json(event[0])
    }catch{
        res.status(404).json({message:'No se encontro el evento'})
    }
}

const updateEvent = async(req,res)=>{
    try{
        await editEvent(req.body, req.params.id)
        const event = await getById(req.params.id)
        res.status(200).json({event:event[0]})
    }catch{
        res.status(404).json({message:'No se encontro el evento'})
    }
}

const deleteById = async(req,res)=>{
    try{
        await deleteEvent(req.params.id)
        res.status(200).json({message:'Evento eliminado'})
    }catch{
        res.status(404).json({message:'Evento no eliminado'})
    }
}

module.exports = {
    addEvent, getAllEvents, getEventById, updateEvent,deleteById
}