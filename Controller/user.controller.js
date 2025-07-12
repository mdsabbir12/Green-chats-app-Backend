
import User from "../model/user.model.js";
import bcrypt from "bcrypt";
import createTokenandsavecookis from "../jwt/generateToken.js"
export const signup = async (req,res)=>{
    try {
        const{name,email,password,confirmpass}= req.body;
    if (password==!confirmpass)
    {
       return res.status(400).json({message: "password don't match"});
    }
    const user =await  User.findOne({email});
    
    if(user){
       return res.status(400).json({message: "User alredy exix"});
    }
    const hashpassward = await bcrypt.hash(password,10);
    const newuser = await new User({
        name,
        email,
        password: hashpassward,   
    });
    await newuser.save()
    if(newuser){
        createTokenandsavecookis(newuser._id,res);
        res.status(201).json({message: "User register Sucessfully",
            user:{
            _id:newuser._id,
            name:newuser.name,
            email:newuser.email,
          }});
    }
    
    } 
    catch (error) {
         console.log(error);
         res.status(500).json({message: "Server error"});
    }
};


export const login = async (req,res)=>{
    try {
        const{email,password}= req.body;

        const user = await  User.findOne({email});
        const ismatch= await bcrypt.compare(password,user.password);
        if (!user || !ismatch) {
            return res.status(400).json({message: "Invalid User name or password"}); 
        }
        createTokenandsavecookis(user._id,res);
        res.status(201).json({
            message:"User loging  sucessfully",
            user:{
              _id:user._id,
              name:user.name,
              email:user.email,
            }});

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Server Error"});
    }
};

export const logout = async (req,res)=>{
    try {
        res.clearCookie("jwt");
        res.status(201).json({
        message:"User logout  sucessfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Server Error"}); 
    }
}

export const getUserProfile= async (req,res)=>{
    try {
         const loggedInUser= req.user._id;
        const filterallUsers= await User.find({ _id: { $ne: loggedInUser }}).select("-password");
        res.status(201).json({filterallUsers});
    } catch (error) {
        console.log("Error in filterallUsers Controller: "+error);
        res.status(500).json({message:"Server Error from user controller"})
    }
}