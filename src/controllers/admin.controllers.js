const User = require("../models/users.models");


const deleteUsers = async (res, req)=>{
    const {id} = req.params;
    try{
        if (req.user.id === req.params.id){
            return res.status(400).json({message: "Admins cannot delete themselves"})
        }
        await User.findByIdAndDelete( req.param.id);
        res.staus(200).json({message: "User has been deleted"})
    }
   
    catch(e){
         console.log(e);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const promoteUsers = async (res, req)=>{
    const {id} = req.params;
    try{
        const user = await User.findById( req.params.id);
        res.staus(200).json({message: "User has been deleted"})

        if (user.role === admin){
            return res.status(400).json({message: "Admins cannot promote Admins"})
        }

        user.role = "moderator";
        await user.save();
        res.json({message:"User promoted"});
    }
   
    catch(e){
         console.log(e);
        return res.status(500).json({ message: "Internal server error" });
    }

};

module.exports = {promoteUsers, deleteUsers}