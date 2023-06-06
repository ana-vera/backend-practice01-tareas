const asyncHandler = require('express-async-handler')
const Tarea = require('../models/tareaModel')

//tareas models

const getTarea = asyncHandler( async (req,res)=>{
    const tareas = await Tarea.find({})
    res.status(200).json({message: 'obtener las tareas'})
})

const setTarea = asyncHandler( async (req,res)=>{
    if(!req.body.texto) {
       // res.status(400).json({error: "por favor teclea un texto"})
       res.status(400)
       throw new Error('Por favor teclea un texto')
    }

    const tarea = await Tarea.create({
        texto: req.body.texto
    })

    res.status(201).json({ tarea })
})

const updateTarea = asyncHandler ( async (req,res)=>{

    const tarea = await Tarea.findById(req.params.id)
    if (!tarea){
        res.status(400)
        throw new Error('La tarea no fue encontrada')
    }

    const tareaUpdated = await Tarea.findByIdAndUpdate(req.params.id, req.body, {new: true} )

    res.status(200).json({message: `Se modificó la tarea ${req.params.id}`})
})

const deleteTarea = asyncHandler(async (req,res)=>{

    const tarea = await Tarea.findById(req.params.id)
    if(!tarea){
        res.status(400)
        throw new Error('La tarea no fue encontrada')
    }
    await tarea.deleteOne()
    res.status(200).json({id: req.params.id})
})

module.exports  = {
    getTarea,
    setTarea,
    updateTarea,
    deleteTarea
}