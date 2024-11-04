require("dotenv").config()
const express = require("express")
const app = express()
const cors = require('cors');
const userRoutes = require("./routes/userRoutes")
const carRoutes = require("./routes/carRoutes")
const locationRoutes = require("./routes/locationRoutes")
const demoRoutes = require("./routes/demoDriveRoutes")
const quotationRoutes=require("./routes/quotationRoutes")
const blogRoutes=require("./routes/blogRoutes")
const preBookingRoutes=require("./routes/preBookingRoutes")
const connectDB = require("./db/connect")

const PORT = process.env.PORT || 3000

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', 
  }));
app.get("/", (req, res) => {
    res.send("Hi, I am Live!")
})

app.use("/api/user", userRoutes)
app.use("/api/car", carRoutes)
app.use("/api/location", locationRoutes)
app.use("/api/demoBook", demoRoutes)
app.use("/api/quotation",quotationRoutes)
app.use("/api/blogs",blogRoutes)

app.use('/api/prebooking', preBookingRoutes);

const start = async () => {
    try {
        await connectDB("mongodb+srv://user1:usertest123@electricvehicleapi.7exgrd1.mongodb.net/?retryWrites=true&w=majority&appName=ElectricVehicleAPI")
        app.listen(PORT, () => {
            console.log(`Server started at port${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start();
