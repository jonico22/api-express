const express = require('express');
const route = express.Router();

const Controller = require('./controller');
const objController = new Controller();
route.get('/', (req, res)=>{
    let list =  objController.getAll(); 
    res.status(200).json(list);
})

route.get('/:id', (req, res)=>{
    console.log(req.params.id)
    let list =  objController.getById(req.params.id); 
    if ( list === null) {
        res.status(200).json( {error: 'producto no encontrado'});
    } else {
        res.status(200).json(list);
    }
    
})

route.delete('/:id', (req, res)=>{
    
    let list =  objController.deleteById(req.params.id); 
    console.log(list)
    if ( list === null) {
        res.status(200).json( {error: 'producto no encontrado'});
    } else {
        res.status(200).json(list);
    }
    
})

route.post('/', (req, res)=>{
    let data =  req.body
    res.status(200).json( objController.save(data));   
})

route.put('/:id', (req, res)=>{
    console.log(req.body)
    let list =  objController.updateById(req.params.id,req.body); 
    if ( list === null) {
        res.status(200).json( {error: 'producto no encontrado'});
    } else {
        res.status(200).json(list);
    }
    
})

module.exports = route;
