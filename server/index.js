const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/connectDB');
const router = require('./routes/index.js');
const cookieParser = require('cookie-parser')


const app = express();

app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials: true 
}))

app.use(express.json());
app.use(cookieParser())
app.get('/', (req, res)=>{
    res.json({
        message: `Server is runing at ${PORT}`
    })
})
//api end points 
app.use('/api',router)

const PORT = process.env.PORT || 5000
connectDB().then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Server is runing at ${PORT}`);
    })
});
