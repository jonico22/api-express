function searchId (item,id){
    let search = item.filter(elm => Number(elm.id) === Number(id))[0]
    return search === undefined ? null : search
}
class Controller {
    products
    constructor(){
        this.products = []
    }
     save(data){
       
        let newId = this.products.length + 1
        let search = searchId(this.products,newId)
        if ( search === null) {
            data['id'] = newId
        } else {
            data['id'] = Math.max(...this.products.map( item=>item.id)) + 1
        }
        this.products.push(data)
        return data
        
    }

     getById(id){
        let result =  searchId(this.products,id)
        return result
    }

     getAll(){
        return this.products
    }

     deleteById(id){
        let search = searchId(this.products,id)
        if ( search === null) {
            return null
        } else {
            return this.products.filter(elm => Number(elm.id) !== Number(id))
        }
    }

    updateById(id,data){
        let search = searchId(this.products,id)
        if ( search === null) {
            return null
        } else {
            let result = this.products.filter(elm => Number(elm.id) === Number(id))[0]
            data.titulo !== undefined ? result.titulo = data.title :  null
            data.precio !== undefined ? result.precio = data.precio :  null
            data.miniatura !== undefined ? result.miniatura = data.miniatura :  null
            return this.products
        }
    }

}

module.exports = Controller;