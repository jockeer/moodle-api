const express = require('express')
const router = express.Router()
const pool = require('../database')

//-------------ROUTES-------------------
router.get('/', function (req, res, next) {
    res.json({
        message: 'Hola'
    })
});



//----------------API---------------------------
let json = {}

router.get('/api/traerMaterias', async (req, res, next) => {

    var query = pool.query(`SELECT id, fullname, shortname from mdl_course`, function(error, result){
        if(error){
           throw error;
        }else{
           console.log(result);
        }
        res.json(result)
      }
     );
    
})
router.get('/api/traerGruposMateria', async (req, res, next) => {

    var query = pool.query(`select mdl_groups.id,mdl_course.fullname,mdl_groups.name  from mdl_course, mdl_groups where mdl_groups.courseid=mdl_course.id`, function(error, result){
        if(error){
           throw error;
        }else{
           console.log(result);
        }
        res.json(result)
      }
     );
    
})
router.get('/api/usuarioRegistradoPorCurso', async (req, res, next) => {

    var query = pool.query(`select gm.id,cu.fullname ,us.firstname, us.lastname, gr.name  from mdl_user us join mdl_groups_members gm
                            on(gm.userid= us.id)
                            join mdl_groups gr
                            on(gm.groupid=gr.id)
                            join mdl_course cu
                            on(gr.courseid=cu.id)`, function(error, result){
        if(error){
           throw error;
        }else{
           console.log(result);
        }
        res.json(result)
      }
     );
    
})
router.get('/api/modulosporcurso', async (req, res, next) => {

    // var query = connection.query('INSERT INTO personaje(nombre, apellido, biografia) VALUES(?, ?, ?)', ['Homero', 'Simpson', 'Esposo de Marge y padre de Bart, Lisa y Maggie.'], function(error, result){
    var query = pool.query(`select (ROW_NUMBER() OVER(ORDER BY name ASC)) AS "id",co.fullname, mo.name, COUNT(mo.name) as "Cantidad"
                        from mdl_course_modules com join mdl_course co
                            ON(com.course= co.id)
                            JOIN mdl_modules mo
                            ON(com.module = mo.id)
                            GROUP by co.fullname, mo.name
                            `, function(error, result){
        if(error){
           throw error;
        }else{
           console.log(result);
        }
        res.json(result)
      }
     );
    
})




module.exports = router