import express from 'express'
import dotenv from 'dotenv'
import path from 'path'

import authRoutes from './routes/authRoutes.js'
import messageRoutes from './routes/messageRoutes.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();


app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)

//make ready for deployment
if (process.env.NODE_ENV === "production"){
     app.use(express.static(path.join(__dirname,"../frontend/dist")))

     app.get("*", (req,res)=>{
          res.sendFile(path.join(__dirname,"../frontend", "dist", "index.html"))
     })
}


app.listen(PORT, ()=> console.log(`Server running on http://localhost:${PORT}`))