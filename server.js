const express = require("express")

const userRoute = require('./routes/userRoute')
const postsRoute = require('./routes/postsRoute')
const app = express()

app.use(express.json())

app.use("/api/users",userRoute)
app.use("/api/users/:id/posts",userRoute)
app.use("/api/posts",postsRoute)

app.use((err,req,res,next)=>{
    res.status(err.status || 500).send(err.message ||"Internal Server Error")
})

app.listen(8080, () => {
    console.log('Example app listening on port 8000!')
})
