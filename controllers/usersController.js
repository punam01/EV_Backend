const User=require("../models/User")
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
};

const registerUser = async (req, res) => {
    const { first_name, last_name, email, contact, address, pincode } = req.body;
    try {
        const newUser = new User({
            first_name,
            last_name,
            email,
            contact,
            address,
            pincode
        });
        await newUser.save();
        res.status(201).json({ msg: 'User registered successfully', user: newUser });
    } catch (error) {
        console.error(error);
        if (error.code === 11000) {
            res.status(400).json({ msg: 'User already exists with this email/contact' });
        } else {
            res.status(500).json({ msg: 'Server error' });
        }
    }
};

const updateUser = async (req, res) => {
    const { first_name, last_name, email, contact, address, pincode } = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { first_name, last_name, email, contact, address, pincode },
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.status(200).json({ msg: 'User updated successfully', user: updatedUser });
    } catch (error) {
        console.error(error);
        if (error.code === 11000) {
            res.status(400).json({ msg: 'User already exists with this email/contact' });
        } else {
            res.status(500).json({ msg: 'Server error' });
        }
    }
};

const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.status(200).json({ msg: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
};

module.exports={
    getUserById,
    registerUser,
    updateUser,
    deleteUser
}