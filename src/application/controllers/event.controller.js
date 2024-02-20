import {createEvent,getAll, getById,editEvent, deleteEvent} from '../../domain/models/Event'
import multer from "multer"
import { loadData } from '../../infraestructure/files/fileLoad';

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "src/upload/");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
 
const  upload = multer({
    storage: storage,
}).single("dataEvents");


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
    }catch(err){
        console.log(err)
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

const addEventMassive =  (req, res)=>{
    try{
        upload(req,res, function(err){
            if(err){
                console.log(err)
            }
            else{
                if(req.file){
                let events = loadData('plantilla_load.xlsx')
                events.forEach(async (event)=>{
                   await createEvent(event)
                })
                res.status(200).send('Carga completada')
            }else{
                res.status(404).json({message:'No se encontro archivo'})
            }
            }})
        
    }catch{
        console.log("falla")
    }    
}

const updateEventMassive =  (req, res)=>{
    console.log('req.body')
    try{
        upload(req,res, function(err){
            console.log(req.file)
            if(err){
                console.log(err)
            }
            else{
                if(req.file){
                let events = loadData('plantilla_edit.xlsx')
                events.forEach(async (event)=>{{
                    const eventInDb = await getById(event.id_event)
                    if(eventInDb[0].length>0){
                        await editEvent(event, event.id_event)
                    }else{
                        res.status(404).json({message:'Evento no encontrado'})
                    }
                }})
                res.status(200).send('Carga completada')
            }else{
                res.status(404).json({message:'No se encontro archivo'})
            }}

        })
        
    }catch{
        console.log("falla")
    }    
}

module.exports = {
    addEvent, getAllEvents, getEventById, updateEvent,deleteById,addEventMassive,updateEventMassive
}