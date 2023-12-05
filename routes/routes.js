const express=require('express')
const router=express.Router();
const conecction=require('../database/db');





router.get('/router',(req,res)=>{
    res.json({mensaje : 'This es router'})
})
//ROUTER FOR CREATE
router.post('/create', async(req,res)=>{
    const id=req.body.id;
     const name=req.body.name;
     const last_name=req.body.last_name;
     const email=req.body.email;
     const phone=req.body.phone;
     const subject=req.body.subject;
 

     conecction.query('INSERT INTO techers SET ?', {id:id,name:name,last_name:last_name,email:email,phone:phone,subject:subject}, (err, result)=>{
        if(err)throw err;
        res.json({mensaje:'Successful Registration'})
       console.log('Successful Registration');
     })
    
     
    
})
//ROUTER FOR READ
router.get('/read',(req,res)=>{

    conecction.query('SELECT * FROM techers', function ( err,result) {
        
        if(err)   throw err;
         //NOTA: siempre tienes que enviar los datos en formato JSON
        //para que cuando vayan a consumir tu API puedan manipularlos en formato json
          //  res.send({mensaje: result})
          res.json(result)
           //console.log(result)

    })
    
})
//ROUTER FOR READ
// Completa tu configuración de express y conexión a la base de datos aquí

// Endpoint para buscar usuario por nombre o apellido
router.get('/read/search', (req, res) => {
    const searchTerm = req.query.search; // Obtenemos el término de búsqueda desde la URL

    if (!searchTerm) {
        return res.status(400).json({ mensaje: 'Por favor, proporciona un término de búsqueda válido.' });
    }

    const query = 'SELECT * FROM techers WHERE name LIKE ? OR last_name LIKE ?';
    const searchValue = `%${searchTerm}%`;

    conecction.query(query, [searchValue, searchValue], (err, result) => {
        if (err) {
            return res.status(500).json({ mensaje: 'Error al realizar la búsqueda.' });
        }

        res.json(result);
        //console.log(result)
    });
});

//ROUTER FOR UPDATE
//luego enviamos la modificacion
router.post('/update/:id',(req,res)=>{
    const id=req.body.id;
    const name=req.body.name;
    const last_name=req.body.last_name;
    const email=req.body.email;
    const phone=req.body.phone;
    const subject=req.body.subject

 

    conecction.query('UPDATE techers SET ? WHERE id = ?',[{id:id,name:name,last_name:last_name,email:email,phone:phone,subject:subject}, id],function(err,result){
         if(err)throw err;
         res.json({mensaje:"ID modificado"})
    })
    
})
//ROUTER FOR DELETE
router.get('/delete/:id',(req,res)=>{

    //como no obtenemos el parametro por un formulario hay que utilizar params ara capturar su id 
    const id=req.params.id;
    conecction.query('DELETE FROM techers WHERE id = ?',[id],function(err, result){
        if(err)throw err;
        res.json({mensaje:"ID eliminado"});
        console.log("id eliminado")
    })
    
})







module.exports=router;