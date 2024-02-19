import {createUser , findByEmail,editUser, findById,deleteUser,encryptPass} from '../../domain/models/User'

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
        res.status(200).json({user: user[0]})
    }catch{
        res.status(404).json({message:'Usuario no encontrado'})
    }
}

const updateUser = async (req, res)=>{
    try{
        await editUser(await concatUserInfo(req.body),req.params.id)
        const user = await findById(req.params.id)
        res.status(200).json({user: user[0]})
    }catch{
        res.status(404).json({message:'Usuario no actualizado'})
    }
}

const deleteUserById = async (req, res)=>{
    try{
        await deleteUser(req.params.id)
        res.status(200).json({message: 'Usuario eliminado correctamente'})
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

module.exports = {
  create,searchById,updateUser,deleteUserById
}