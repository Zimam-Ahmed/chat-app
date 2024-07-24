const mongoose = require('mongoose');

async function connectDB(){
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        const connection = mongoose.connection;
        connection.on('connected',()=>{
            console.log('DB connected');
        });
        
        connection.on('error', (error)=>{
            console.log('somthing went wrong');
        });
    } catch (error) {
        console.log('Somthing went wrong', error);
    }
}

module.exports = connectDB;