const { options } = require('../config/options');
const Modelo = require('./model/Product')

const modeloProduct = new Modelo(options);


function searchId (item,id){
    let search = item.filter(elm => Number(elm.id) === Number(id))[0]
    return search === undefined ? null : search
}
class Controller {
    products
    constructor(){
        this.products = []
    }
     async save (data){
        let res = await modeloProduct.insertar(data);
        return res
    }

    async getById(id){
        let result = await modeloProduct.listarDetalle(id)
        return result
    }

    async getAll(){
        let res = await modeloProduct.listar();
        return res
     }

     async deleteById(id){
        let prod = await this.getAll()
        let search = searchId(prod,id)
        if ( search === null) {
            return null
        } else {
            return await modeloProduct.eliminar(id)
        }
    }

    async updateById(id,data){
        let prod = await this.getAll()
        let search = searchId(prod,id)
        if ( search === null) {
            return null
        } else {
            return  await modeloProduct.actualizar({id: id}, data);
        }
    }

}

module.exports = Controller;