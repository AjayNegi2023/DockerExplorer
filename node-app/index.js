const express = require("express");
const app = express();
const PORT = 3000

// Adding somthing in this file will not reflect as image is of previous code which is inside container


app.get("/",(req , res)=>{
    return res.json({
        status: "Success",
        message : "Express Sever"
    })
})
app.listen(PORT , ()=>{
    console.log("Server is running at ", PORT)
})

/**
 * To Run this application following thing are required
 * node : v20.12.2
 * npm installed
 * 
 */