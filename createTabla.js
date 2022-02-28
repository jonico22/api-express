const { options } = require('./config/options');
const knex = require('knex')(options);

knex.schema.createTable('productos', table=>{
    table.increments('id');
    table.string('titulo', 100).notNullable();
    table.float('precio');
    table.string('miniatura');
})
.then(()=>{
    console.log('Tabla creada!')
})
.catch((error)=>{
    console.error(
        {
            codigo: `${error.errno}|${error.code}`,
            msg: error.sqlMessage
        }
    )
})
.finally(()=>{
    knex.destroy();
})
