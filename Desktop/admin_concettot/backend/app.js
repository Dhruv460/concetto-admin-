require('dotenv').config()
const express = require('express');
const PORT = process.env.PORT || 8080;
const bodyParser = require('body-parser');
const createError = require('http-errors');
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const auth = require("./routes/auth");
const campusAmbassador = require("./routes/campusAmbassador");
const cors = require('cors')
const app = express();


main().catch(e => console.log(e)).then(() => console.log("Database connected !!!"));
async function main(){
  await mongoose.connect("mongodb+srv://kumaralok100404:uIFivFwPV7IKkbMo@cluster0.qyda4bn.mongodb.net/",{
    serverSelectionTimeoutMS: 20000
  });
}




app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser());

app.use("/api" ,auth );
app.use("/" , campusAmbassador);
app.use("/register",require('./routes/register'))
app.use("/api/admin",require('./routes/admin'))

// app.use(cors({
  
//   origin:"*",


// }))

app.use((err ,req , res , next) => {
    const {message , statusCode} = err;
    console.log(message, statusCode);
    // console.log(err);
    res.status(statusCode).send({error : err.message})
});


app.listen(PORT , () => {
    console.log(`Listening on PORT : ${PORT}`)
})