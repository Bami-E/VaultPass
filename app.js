const express = require ("express");
const morgan = require ("morgan");
const mongoose = require ("mongoose");
const dotenv = require ("dotenv")
dotenv.config();
const dbConnection = require('./src/config/db')
const userRoutes = require("./src/routes/user.routes")
const moderatorRoutes = require ("./src/routes/moderator.routes");
const publicRoutes = require ("./src/routes/public.routes");
const authRoutes = require ("./src/routes/auth.routes");
const adminRoutes = require ("./src/routes/admin.routes");


const app = express();
const port = process.env.PORT;


app.use(express.json())
app.use(morgan("dev"))

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes);
app.use("/api/moderator", moderatorRoutes)
app.use("/api/public", publicRoutes)
app.use("/api/admin", adminRoutes)



app.listen(port, ()=>{
    dbConnection();
    console.log(`Server is running on ${port}`)
})