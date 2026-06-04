const mongoose = require('mongoose');


const DbConnection = async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Connected to database")
    }
    catch(e){
        console.log("Error connecting to Db")
        process.exit(1);
    }
    
}
module.exports = DbConnection;