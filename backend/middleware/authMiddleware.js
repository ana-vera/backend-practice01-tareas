const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler( async(req,res,next)=>{
    let token
    
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            //Obtener el token del encabezado de autorizacion
            token = req.headers.authorization.split(' ')[1]

            //Verificamos el token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            //Obtenemos el user del token menos el password
            //cualquier ruta protegida con la funcion protect va a tener acceso
            //a los datos del usuario menos el pwd
            console.log(decoded.id)
            req.user = await User.findById(decoded.id).select('-password')

            //Continuamos con la ejecucion del programa
            next()

        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Access unauthorized')

        }
    }

    if (!token){
        res.status(401)
        throw new Error('Acces unauthorized, no token was provided')
    }
})

module.exports = { protect }   