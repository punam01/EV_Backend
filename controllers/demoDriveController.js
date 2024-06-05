const PreBooking = require("../models/DemoDrive")

const getAllDemoBookings=async(req,res)=>{
    try{
        const booking = await PreBooking.find()
        res.send(booking)
    }catch(error){
        console.log(error)
    }
}

const getUserHistory = async (req, res) => {
    try {
        const userId = req.params.user_Id;
        console.log(userId)
        const history = await PreBooking.find({ userId }); 
        console.log(history)
        if (!history || history.length === 0) {
            return res.status(404).json({ msg: 'History not found' });
        }

        res.status(200).json(history);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
}

const addDemoBooking=async(req,res)=>{
    const { userId,locationId,modelName,bookingTime,paymentMade ,contact} = req.body;
    try{
       const newBooking=new PreBooking({
        userId,
        locationId,
        modelName,
        bookingTime,
        paymentMade,
        contact
       })
       await newBooking.save();
       res.status(201).json({ msg: 'Demo Booking done successfully', preBooking: newBooking });
    }
    catch(error){
        if(error.code===11000){
            res.status(400).json({ msg: 'One pre booking per mobile number' });
        }else{
            res.status(500).json({ msg: 'Server error' });
        }
    }
}


module.exports = {
    getAllDemoBookings,
    getUserHistory,
    addDemoBooking
}