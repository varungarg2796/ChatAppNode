const path = require('path')
const express = require("express")
const socketIO = require("socket.io")
const http = require("http") //built in (to create server)

const {generateMessage} = require("./utils/message.js") //the message structure to be used
const publicPath = path.join(__dirname, '../public') // .. --> means going up a directory (so we go to ChatAppNode)
const port = process.env.PORT || 3000;

var app = express()
var server = http.createServer(app); //creating server with help of http
var io = socketIO(server)


//listening for new connection

io.on('connection',(socket)=>{
    console.log("New user connected") //server prints when user connects

    //When user enters the chat room, he is welcomed by the admin **WELCOME MESSAGE**
    socket.emit('newMessage', generateMessage('Admin', 'Welcomes you to the chat room'))

    //Show other people that a new user has joined
    socket.broadcast.emit('newUserJoined',{
        from: "Admin",
        text: "new user joined"
    })

    socket.on('createLocationMessage',(coords)=>{
        io.emit('newLocationMessage', generateMessage('Location',`${coords.latitude} ${coords.longitude}`))
    })

    socket.on('createMessage', (message,callback)=>{
        // console.log(message.text);
        // console.log(message.from)
        console.log(message)
        io.emit('newMessage',generateMessage(message.from, message.text)) //io emits to all users connected while socket emits to current user
        callback("GOT IT");
    })

    socket.on('disconnect',()=>{
        console.log(" User disconnected from server") //server prints when user disconnects
    })
})



app.use('/', express.static(publicPath)); // opens index.html in public

server.listen(port, ()=>{
    console.log(`Server is up on ${port}`) 
})