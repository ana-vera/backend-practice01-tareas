const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
//Se mandan a llamar las variables de entorno a partir del metodo process.env
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB =  require('./config/db')
const port = process.env.PORT || 5000 //Si no existe la variable de entorno, que sea el puerto 5000

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(errorHandler)

app.use('/api/tareas', require('./routes/tareasRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

app.listen( port,  ()=>{console.log(`Server started on port ${port}`)} )