require("dotenv").config()
const express = require("express")
const app = express()
const userRoutes = require("./routes/userRoutes")
const carRoutes = require("./routes/carRoutes")
const locationRoutes = require("./routes/locationRoutes")
const demoRoutes = require("./routes/demoDriveRoutes")
const quotationRoutes=require("./routes/quotationRoutes")
const connectDB = require("./db/connect")
const PORT = process.env.PORT || 5000

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hi, I am Live!")
})

app.use("/api/user", userRoutes)
app.use("/api/car", carRoutes)
app.use("/api/location", locationRoutes)
app.use("/api/demoBook", demoRoutes)
app.use("/api/quotation",quotationRoutes)
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, () => {
            console.log(`Server started at port${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start();
