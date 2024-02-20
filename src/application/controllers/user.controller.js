import {createUser , findByEmail,editUser, findById,deleteUser,encryptPass,getCompleteAddress} from '../../domain/models/User'
import {getAllAddresses,getById} from '../../domain/models/Event'
import {getCoorByAddress,distance} from '../../infraestructure/map/mapBoxChoose'

const create = async (req,res)=>{
    const user = await concatUserInfo(req.body, res)
    const userByEmail = await findByEmail(user.email)
    if(userByEmail[0].length>0){
        res.status(404).json({message: 'Ya existe un usuario con ese email'})
    }
    else{
        try{
            await createUser(user)
            res.status(201).json({message: 'Usuario creado correctamente'})
        }catch{
            res.status(404).json({message: 'Usuario no creado '})
        }
    }
 
}

const searchById = async (req, res)=>{
    try{
        const user = await findById(req.params.id)
        if(user[0].length>0)
            res.status(200).json({user: user[0]})
        else
        res.status(404).json({message:'Usuario no encontrado'})
    }catch(err){
        console.log(err)
        res.status(404).json({message:'Usuario no encontrado'})
    }
}

const updateUser = async (req, res)=>{
    try{
        await editUser(await concatUserInfo(req.body),req.params.id)
        const user = await findById(req.params.id)
        if(user[0].length>0)
            res.status(200).json({user: user[0]})
        else
            res.status(404).json({message:'Usuario no encontrado'})
    }catch(err){
        console.log(err)
        res.status(404).json({message:'Usuario no actualizado'})
    }
}

const deleteUserById = async (req, res)=>{
    try{
        const user = await findById(req.params.id)
        if(user[0].length>0){
            await deleteUser(req.params.id)
            res.status(200).json({message: 'Usuario eliminado correctamente'})
        
        }else{
            res.status(404).json({message:'Usuario no encontrado'})
        }
    }catch{
        res.status(404).json({message: 'Usuario no eliminado'})
    }
}

const concatUserInfo = async (info) =>{
    return {
        name: info.name,
        email: info.email,
        password: await encryptPass(info.password),
        phone_number: info.phone_number,
        address: info.address,
        id_rol: info.id_rol,
        id_city: info.id_city
    }
}

const getNearbyLocations = async (req, res)=>{
    let distanceUser = req.body.distance
    try{
        const user = await findById(req.params.id)
        if(user[0].length>0){
            const { lat, lon } = await userLatAndLon(req)
            const eventCoords = await calculateCoordsToEvents()
            const eventsInRange= []
            for (const item of eventCoords) {
                if(distance(lat,lon,item.lat,item.lon)<=distanceUser){
                    let eventInRange = await getById(item.id)
                    eventsInRange.push(eventInRange[0][0])
                }
            }
            res.status(200).json(eventsInRange)
        }else{
            res.status(404).json({message: 'Usuario no encontrado'})
        }
    }catch(err){
        console.log(err)
    }
}

module.exports = {
  create,searchById,updateUser,deleteUserById,getNearbyLocations
}

const   userLatAndLon = async(req) => {
    const address = await getCompleteAddress(req.params.id)
    const data = await getCoorByAddress(address[0][0].full_address)
    const coor = data.data.features[0].geometry.coordinates
    const lat = coor[1]
    const lon = coor[0]
    return { lat, lon }
}
const  calculateCoordsToEvents = async() =>{
    const eventAdress = await getAllAddresses()
    const eventCoords = []
    for (const item of eventAdress[0]) {
        const data = await getCoorByAddress(item.full_address)
        const coor = data.data.features[0].geometry.coordinates
        const lat = coor[1]
        const lon = coor[0]
        eventCoords.push({ id: item.id_event, lat: lat, lon: lon })
    }
    return eventCoords
}

