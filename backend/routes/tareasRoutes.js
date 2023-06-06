const express = require('express')
const router = express.Router()
const {getTarea, setTarea, updateTarea, deleteTarea} = require('../controllers/tareasControllers')

router.route('/')
    .get(getTarea)
    .post(setTarea)

router.route('/:id')
    .put(updateTarea)
    .delete(deleteTarea)

//router.get('/', getTarea)
//router.post('/', setTarea)
//router.put('/:id', updateTarea)
//router.delete('/:id', deleteTarea)


router.delete('/:id', (req,res)=>{
    res.status(200).json({message: `La siguiente tarea fue eliminada: ${req.params.id}`})
})



module.exports =  router
