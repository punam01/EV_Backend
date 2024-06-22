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

const getUserByCustomId= async (req, res) => {
  const  custom_id  = req.params.customId;
  console.log(custom_id)
  try {
    const user = await User.findOne({ custom_id:custom_id });
    console.log(user)
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
}
const registerUser = async (req, res) => {
    const { custom_id, first_name, last_name, email, contact, address, pincode } = req.body;
  
    try {
      const newUser = new User({
        custom_id,
        first_name,
        last_name,
        email,
        contact: contact.substring(1), // Assuming you want to remove the first character (like '+')
        address,
        pincode
      });
      await newUser.save();
      res.status(201).send({ msg: 'User registered successfully', _id: newUser._id });
    } catch (error) {
      console.error(error);
      if (error.code === 11000) {
        res.status(400).json({ msg: 'User already exists with this email/contact' });
      } else {
        res.status(500).json({ msg: 'Server error' });
      }
    }
  };
  

const updateUserByCustomId = async (req, res) => {
    const custom_id = req.params.customId;  // Extract the custom_id from the request parameters
    const userData = req.body;  // Get the user data from the request body
    console.log(custom_id,userData)
    try {
        const updatedUser = await User.findOneAndUpdate(
            { custom_id: custom_id },  // Find the user by custom_id
            { $set: userData },  // Update the user data
            { new: true, runValidators: true }  // Return the updated document and run validators
        );

        if (!updatedUser) {
            return res.status(404).json({ msg: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
}

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

const checkUserByPhoneNumber = async (req, res) => {
    const { phoneNumber } = req.query;
    if (!phoneNumber) {
        return res.status(400).json({ msg: 'Phone number query parameter is required' });
    }
    try {
        const user = await User.findOne({ contact: phoneNumber , testdrive:false});
        if (user) {
            return res.status(200).json({ exists: true, msg: 'User already exists with this phone number' });
        }
        res.status(200).json({ exists: false, msg: 'No user found with this phone number' });
    } catch (error) {
        console.error(`Error during database query: ${error}`);
        res.status(500).json({ msg: 'Server error', error: error.message });
    }
};

const verifyUserDetails = async (req, res) => {
    const { firstName, lastName, email, phoneNumber } = req.body; // Extract parameters from req.body

    // Log received parameters
    console.log('Received Parameters:', { firstName, lastName, email, phoneNumber });

    try {
        if (!firstName || !lastName || !email || !phoneNumber) {
            return res.status(400).json({ msg: 'Missing required parameters in the request body' });
        }

        console.log('Searching for user with details:', { firstName, lastName, email, phoneNumber });

        const user = await User.findOne({
            first_name: firstName,
            last_name: lastName,
            email: email,
            contact: phoneNumber
        });

        if (user) {
            console.log('User found:', user._id.toString());
            return res.status(200).json({ userExists: true, userId: user._id.toString(), customId: user.custom_id, msg: 'User found' });
        } else {
            console.log('User not found');
            return res.status(200).json({ userExists: false, msg: 'User not found' });
        }
    } catch (error) {
        console.error('Error in verifyUserDetails:', error);
        return res.status(500).json({ msg: 'Server error', error: error.message });
    }
};



module.exports={
    getUserById,
    registerUser,
    updateUser,
    deleteUser,
    getUserByCustomId,
    updateUserByCustomId,
    checkUserByPhoneNumber,
    verifyUserDetails
}