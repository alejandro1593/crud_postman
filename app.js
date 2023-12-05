const express=require('express');
const morgan= require('morgan');
const app=express();
const router=require('./routes/routes');
const bodyParser = require('body-parser');
const cors=require('cors')

app.use(cors());



app.use(morgan('dev'));
app.use(bodyParser.json());

//esto se utiliza para cuando se va a capturar datos de formularios
app.use(express.urlencoded({extended:false}));
//ademas que obtegamos los datos en formato json
app.use(express(JSON));


const port=process.env.port || 3000;



app.use('/api',router);
//app.use('/api',router);


app.get('/',(req,res)=>{
    res.send("This is express");
})







app.listen(port, ()=>{
    console.log(`Listening for PORT ${port}`);
})