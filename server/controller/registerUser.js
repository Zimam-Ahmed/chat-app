const UserModel = require("../models/userModel");
const bcryptjs = require('bcryptjs')
async function registerUser(req, res){
    try {
        const { name, email, password, profile_pic } = req.body;
        const checkEmail = await UserModel.findOne({email});
        if(checkEmail){
            return res.status(400).json({ message: 'User Already Exists', error: true}) 
        }
        //converting password into hash
        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, salt); 

        const payload = {
            name,
            email,
            profile_pic,
            password: hashPassword
        }

        const user = new UserModel(payload)
        const userSave = await user.save();

        res.status(201).json({ message: 'New User Created', data : userSave, success: true })
    } catch (error) {
        return res.status(500).json({ 
            message: error.message || error,
            error: true  
        })
    }
}

module.exports = registerUser;