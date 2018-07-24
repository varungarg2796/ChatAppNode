var socket = io(); //essential to emit and listen

socket.on('connect', function () {
    console.log("Connected to server") //client prints when user connected
})

socket.on('disconnect', function () {
    console.log("Disconnected from server") //client prints when disconnected
})


socket.on('newMessage', function (message) { //server.js should have emit function from same name with data that needs to be passed here
    console.log(message) //data passed from server.js(emit) is saved here as object
    console.log(message.from)
    console.log(message.text)
    console.log(message.createdAt)

    var li = $('<li></li>')
    li.text(`${message.from}: ${message.text}`)
    $("#displayMessage").append(li)
})


socket.on('newUserJoined', function (message) { //server.js should have emit function from same name with data that needs to be passed here
    var li = $('<li></li>')
    li.text(`${message.from}: ${message.text}`)
    $("#displayMessage").append(li)
})



$("#message-form").on('submit', function (e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'Input',
        text: $("#message").val()
    }, function (data) {
        console.log(data)
    })
})

var locationButton = $("#sendLocation");
locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser')
    }



    navigator.geolocation.getCurrentPosition(function (location) {

            socket.emit('createLocationMessage', {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            })
        },
        function errorCallback(error) {
            alert("ERROR")
        }, {
            maximumAge: Infinity,
            timeout: 5000
        }
    );


})



//for acknowledgement
//to automatically emit message
// socket.emit('createMessage', {
//     from: 'frank',
//     text: 'hi'
// }, function(data){
//     console.log(data)
// })