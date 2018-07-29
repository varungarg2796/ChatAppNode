var socket = io(); //essential to emit and listen

// function scrollToBottom(){
//     //selectors
//     var messages = $("#messages")
//     var newMessage = messages.children('li:last-child')
//     //heights
//     var clientHeight = messages.prop('clientHeight');
//     var scrollTop = messages.prop('scrollTop')
//     var scrollHeight = messages.prop('scrollHeight')
//     var newMessageHeight = newMessage.innerHeight()
//     var lastMessageHeight = newMessage.prev().innerHeight()

//     if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
//         console.log("Should scroll")
//     }
// }

function scrollToBottom () {
    // Selectors
    var messages = jQuery('#displayMessage');
    var newMessage = messages.children('li:last-child')
    // Heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();
  
    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
      messages.scrollTop(scrollHeight);
    }
  }

socket.on('connect', function () {
    console.log("Connected to server") //client prints when user connected
})

socket.on('disconnect', function () {
    console.log("Disconnected from server") //client prints when disconnected
})

socket.on('newMessage', function (message) { //server.js should have emit function from same name with data that needs to be passed here
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = $("#message-template").html()
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    })

   $("#displayMessage").append(html)

   scrollToBottom();
   
    // console.log(message) //data passed from server.js(emit) is saved here as object
    // console.log(message.from)
    // console.log(message.text)
    // console.log(message.createdAt)
    // var formattedTime = moment(message.createdAt).format('h:mm a');
    // console.log(formattedTime)
    // var li = $('<li></li>')
    // li.text(`${message.from}: ${formattedTime} ${message.text}`)
    // $("#displayMessage").append(li)
})

socket.on('newLocationMessage', function (message) { //server.js should have emit function from same name with data that needs to be passed here
    console.log(message)
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = $("#location-message-template").html()
    var html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        createdAt: formattedTime
    })

   $("#displayMessage").append(html)

   scrollToBottom();

    // var li = $('<li></li>')
    // var a = $('<a target="_blank"> My curreçnt location </a>')
    // li.text(`${message.from} ${formattedTime} `)
    // a.attr('href', message.url)
    // li.append(a)
    // $("#displayMessage").append(li)
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

var locationButton = $("#send-location");
locationButton.on('click', function () {
    $.get("https://ipinfo.io", function (response) {
        console.log(response.ip, response.country);
        console.log(response.loc)
        socket.emit('createLocationMessage', {
            location: response.loc
        })
        console.log(response.log)
    }, "jsonp")

})



//for acknowledgement
//to automatically emit message
// socket.emit('createMessage', {
//     from: 'frank',
//     text: 'hi'
// }, function(data){
//     console.log(data)
// })