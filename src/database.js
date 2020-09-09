const mysql = require('mysql')


// const connectionString = 'postgresql://postgres:posgres@localhost:5432/totaises'

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'moodle',
    port: 3306
 });




const Cnx = async () => {
    connection.connect(function(error){
        if(error){
           throw error;
        }else{
           console.log('Conexion correcta.');
        }
     });
}

Cnx()

module.exports = connection