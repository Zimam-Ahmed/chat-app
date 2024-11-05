const express = require('express');
const { Server } = require('socket.io');
const http  = require('http');
const  getUserDetailsFromToken  = require('../helpers/getUserDeatilsFromToken');
const UserModel = require('../models/UserModel');
const app = express()
const { ConversationModel } = require('../models/conversationModel');
const { MessageModel } = require('../models/conversationModel');

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
        
        //get previous messages
        const getConversation = await ConversationModel.findOne({
            "$or" : [
                {sender : user?._id , receiver :userId},
                {sender : userId , receiver : user?._id },
            ]
        }).populate('messages').sort({ updateAt : -1 })

        socket.emit('message', getConversation.messages )

    })

    //new message
    socket.on('new-message', async(data)=>{
        console.log('new message', data)
        // check conversation is available for both user
        let conversation = await ConversationModel.findOne({
            "$or" : [
                {sender : data?.sender , receiver : data?.receiver},
                {sender : data?.receiver , receiver : data?.sender },
            ]
        })
        //if conversation is not available then create a new one 

        if(!conversation){
            const createConversation = await ConversationModel({
                sender : data?.sender,
                receiver : data?.receiver
            })
            conversation = await createConversation.save()
        }

        const message = new MessageModel({
            text : data.text,
            imageUrl : data.imageUrl,
            videoUrl : data.videoUrl,
            msgByUserId : data.msgByUserId
        })
        const saveMessage = await message.save()

        const updateConversation = await ConversationModel.updateOne({ _id : conversation?._id }, {
            "$push" : { messages : saveMessage?._id }
        })

      
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