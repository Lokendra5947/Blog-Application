const express = require("express")
// const status  =require("express-status-monitor")
const { userRoutes } = require("./Routes/userRoutes")
const { blogRouter } = require("./Routes/blogRoutes")
const { commentRouter } = require("./Routes/comntRoutes")

let app = express()
PORT = 1230
require("./helper/dbConnection")
// app.use(status())
app.use(express.json())
app.use('/user',userRoutes)
app.use("/blog",blogRouter)
app.use("/comment",commentRouter)

app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`)
})