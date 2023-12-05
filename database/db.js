const mysql=require('mysql')

const conecction=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'search_engine'

})

conecction.connect((err)=>{
    if(err)throw err;
    console.log('Connect at DATABASE');
})


module.exports=conecction;

