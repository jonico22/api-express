const knexLib = require('knex');

class Chat {

    constructor(optionsSqlLite){
        this.knex = knexLib(optionsSqlLite);
    }

    crearTabla(){
        return this.knex.schema.dropTableIfExists('chat')
            .finally(()=>{
                return this.knex.schema.createTable('chat', table=>{
                    table.increments('id').primary();
                    table.string('autor', 100).notNullable();
                    table.string('texto', 100).notNullable();
                    table.string('update');
                })       
            })
    }

    insertar(data){
        return this.knex('chat').insert(data);
    }

    listar() {
        return this.knex.from('chat').select('*');
    }

    cerrarConexion() {
        this.knex.destroy();
    }
}

module.exports = Chat;
