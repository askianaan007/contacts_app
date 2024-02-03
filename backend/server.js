const express = require('express'); //1 set express
const errorHandler = require('./middleware/errorHandle');
const connectDb = require('./config/dbConnection');
const dotenv = require('dotenv').config(); //2 set a dot env

connectDb(); //9.4 
const app = express();  //1.1

const port = process.env.PORT || 5000; //2

// app.get('/api/contacts',(req,res)=>{ //3 for send a response
//      res.send("get all contacts") //3.1
//     res.status(200).json({message:"get all contacts"}) //3.2 //if we send using json format , and send a status code 200
// })
//// 4 in routes folder

app.use(express.json()) ;//5.2
app.use ("/api/contacts",require('./routes/contactRoutes')) //5
app.use(errorHandler)

app.listen(port,()=>{
    console.log(`port listening on ${port}`); //2.1
})