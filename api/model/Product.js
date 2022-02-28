const knexLib = require('knex');

class Product {

    constructor(options){
        this.knex = knexLib(options);
    }

    crearTabla(){
        return this.knex.schema.dropTableIfExists('productos')
            .finally(()=>{
                return this.knex.schema.createTable('productos', table=>{
                    table.increments('id').primary();
                    table.string('titulo', 100).notNullable();
                    table.float('precio');
                    table.string('miniatura');
                })       
            })
    }

    insertar(articulos){
        return this.knex('productos').insert(articulos);
    }

    listar() {
        return this.knex.from('productos').select('*');
    }

    listarDetalle(id) {
        return this.knex.from('productos').select('*').where('id', id);
    }

    eliminar(id) {
        return this.knex.from('productos').where('id', id).del();
    }

    actualizar(condicion , parametros) {
        return this.knex.from('productos').where(condicion).update(parametros);
    }

    cerrarConexion() {
        this.knex.destroy();
    }
}

module.exports = Product;
