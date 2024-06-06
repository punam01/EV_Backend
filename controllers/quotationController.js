const Quotation = require("../models/Quotation")

const getAllQuotations = async (req, res) => {
    try {
        const data = await Quotation.find({})
        if (data.length === 0) {
            res.send({ msg: "No data entered" })
        }
        //res.send(data)       
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Server error' });
    }
}
const getQuotationById = async (req, res) => {
    try {
        const userId = req.params.user_Id
        const quotation = await Quotation.find({ userId: userId })
        res.send(quotation)
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Server error' });
    }
}
const getConfigDetailsById=async(req,res)=>{
    try{
        const quotationId=req.params.qId
        const configDetails=await Quotation.find({_id:quotationId},'modelId configDetails')
        res.send(configDetails)
    }catch(error){
        console.log(error)
        res.status(500).json({msg:"SErver Errors"})
    }
}

const deletedQuotation = async (req, res) => {
    try {
        const deleteQ = await Quotation.findByIdAndDelete(req.params.id);
        if (!deleteQ) {
            return res.status(404).json({ msg: 'Quotation not found' });
        }
        res.status(200).json({ msg: 'Quotation deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
};
module.exports = {
    getAllQuotations,
    getQuotationById,
    getConfigDetailsById,
    deletedQuotation
}