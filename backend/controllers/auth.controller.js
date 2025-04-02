import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js"
import bcryptjs from 'bcryptjs'
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req,res) => {
    console.log("on signup page");

    try {
        const {email, password, name} = req.body

    if (password.length < 6) {
        return res.status(400).json({message: "Password should be atleast 6 character"})
    }
    console.log('password check done');
    
    const user = await User.findOne({email})
    
    if(user){
        return res.status(400).json({message: "User already exist with this Email"})
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password,salt)

    const newUser = new User({
        name: name,
        email: email,
        password: hashedPassword,

    })

    if(newUser){
        //generate jwt token
        generateToken(newUser._id, res)
        await newUser.save();
        console.log("newUser saved");
        

        res.status(201).json({
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            profilePic: newUser.profilePic,
        })
    }else{
        res.status(400).json({message: "Invalid user data"})
    }

    } catch (error) {
        console.log("error in creating a new user");
        console.log(error);
        
    }

}


export const login = async (req,res) => {
    console.log('on login page');
    
    const {email, password} = req.body;
    
    try {
        const user = await User.findOne({email})

        if(!user){
            return res.status(400).json({message:"User Does not exist"})
        }

        const isPasswordCorrect = await bcryptjs.compare(password, user.password)

        if(!isPasswordCorrect) {
            return res.status(400).json({message:"Wrong Password"})
        }        
  
        // Generate JWT Token
        generateToken(user._id, res)
        console.log("jwt token generated");

        return res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
            profilePic: user.profilePic,
        })

    } catch (error) {
        console.log(error);
        return res.status(400).json({message:"Something went worng"})
        
    }
}


export const logout = (req,res) => {
console.log('on logout page');
    try {
        res.cookie("jwt", "", {maxAge:0});
        res.status(200).json({message:"Logged out Successfully"})
    } catch (error) {
        res.status(400).json({message:"Logged out Failed"})
        console.log(error);
        
    }
}

export const updateProfile = async (req, res) => {
    console.log("in update profile");
    console.log(req.user);
    
    
    try {
        
        const {profilePic} = req.body;
        const user = req.user;


        if(!profilePic){
            res.status(400).json({message:"Profile Picture is not Provided"})
        }
        const uploadResult = await cloudinary.uploader.upload(profilePic)
        const updatedProfile = await User.findByIdAndUpdate(user._id, {profilePic: uploadResult.secure_url}, {new:true});
        console.log(uploadResult.secure_url);
        console.log(user._id);
        
        
        

        res.status(200).json({message: 'Profile Picture uploaded'})

    } catch (error) {
        console.log('Failed to upload Image');
        console.log(error);
        
        res.status(400).json({message: 'Error in Uploading Profile Picture'})
    }
}

export const checkAuth = (req, res) => {
    try {
        
        return res.status(200).json(req.user);
    } catch (error) {
        // console.log('Error in check Auth');
        // console.log(error);

        res.status(400).json({message: 'Error in Check Auth'})
    }
}