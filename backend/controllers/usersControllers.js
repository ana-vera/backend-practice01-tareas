const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require ('express-async-handler')
const User = require('../models/userModel')



const crearUsuario = asyncHandler( async (req, res) => {

    const {name, email, password} = req.body

    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Faltan datos')
    }

    const userExists = await User.findOne({email})
    if (userExists) {
        res.status(400)
        throw new Error('Ese correo ya está registrado')
    }

    const salt  = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if(user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: user.token
        })
    } else{
        res.status(400)
        throw new Error('Invalid data')
    }

})

const loginUser = asyncHandler ( async (req,res) => {
    
    const {email, password} = req.body

    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id)
        })
    } else {
        res.status(400)
        throw new Error("Incorrect username or password")
    }
})

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}



const misDatos = asyncHandler ( async(req,res) => {
    res.json({ message: 'data'})
})



module.exports = {
    crearUsuario,
    loginUser,
    misDatos
}