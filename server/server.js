const path = require('path')

const publicPath = path.join(__dirname, '../public') // .. --> means going up a directory (so we go to ChatAppNode)
const port = process.env.PORT || 3000;
const express = require("express")
const app = express()



app.use('/', express.static(publicPath)); // opens index.html in public

app.listen(port, ()=>{
    console.log(`Server is up on ${port}`)
})