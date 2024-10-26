const express = require('express');
const { Server } = require('socket.io');
const http  = require('http');
const  getUserDetailsFromToken  = require('../helpers/getUserDeatilsFromToken');
const UserModel = require('../models/UserModel');
const app = express()

// socket connections
const server = http.createServer(app)
const io = new Server(server,{
    cors: {
        origin :'http://localhost:3000',
        credentials: true
    }
})

//For now socket running at port http://localhost:8080/

//online User
const onlineUser = new Set()
io.on('connection', async(socket)=>{
    
    console.log('User connected', socket.id)
    
    const token = socket.handshake.auth.token
    //current user details
    const user = await getUserDetailsFromToken(token)

    socket.join(user?._id?.toString())
    onlineUser.add(user?._id?.toString())

    io.emit('onlineUser', Array.from(onlineUser))

    socket.on('message-page', async(userId)=>{
      
        const userDetails = await UserModel.findById(userId).select('-password')
        const  payload = {
            _id : userDetails?._id,
            name : userDetails?.name,
            email : userDetails?.email,
            profile_pic : userDetails?.profile_pic,
            online : onlineUser.has(userId),
        }
        socket.emit('message-user', payload)        
    })
    //disconnect
    socket.on('disconnect', ()=>{
        onlineUser.delete(user?._id)
        console.log('Disconnected User', socket.id)
    })
})

module.exports ={
    app,
    server
}