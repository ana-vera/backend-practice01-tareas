const express = require('express')
const router = express.Router()
const {getTareas, setTarea, updateTarea, deleteTarea} = require('../controllers/tareasControllers')
const {protect} = require('../middleware/authMiddleware')

router.route('/')
    .get(protect, getTareas)
    .post(protect, setTarea)

router.route('/:id')
    .put(protect, updateTarea)
    .delete(protect, deleteTarea)

//router.get('/', getTarea)
//router.post('/', setTarea)
//router.put('/:id', updateTarea)
//router.delete('/:id', deleteTarea)


router.delete('/:id', (req,res)=>{
    res.status(200).json({message: `La siguiente tarea fue eliminada: ${req.params.id}`})
})



module.exports =  router
