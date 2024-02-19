import  {findByEmail, comparePass} from '../../domain/models/User'
const  jwt = require('jsonwebtoken')
import { app} from '../config/config'

const login = async (req, res)=>{
    const {email, password} = req.body;
    const data = await findByEmail(email)
    if(data[0].length>0){
        let user = data[0][0]
        if(await comparePass(password,user.password)){
            const token = jwt.sign(
                {id: user.id_user},
                app.secret
                ,{expiresIn : app.expired})
            res.status(200).json({
                token: token,
                id_user: user.id_user,
                name: user.name,
                email: user.email,
                phone_number: user.phone_number,
                address: user.address,
                id_rol: user.id_rol,
                id_city: user.id_city
            })
        }else{
            res.status(404).json({message: "Contraseña incorrecta"})
        }
    }else{
        res.status(404).json({message: "Email no registrado"})
    }
}

module.exports = {
  login  
} 