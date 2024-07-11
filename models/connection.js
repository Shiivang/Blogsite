const mongoose = require("mongoose");


exports.DBconnection = async ()=>{
    try {

        mongoose.connect(process.env.MONGODB_URI)
        console.log("connected!....");
        
    } catch (error) {
        console.log(error.message);
    }

}