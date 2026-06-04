const User = require("../models/users.models");


const deleteUsers = async (req, res)=>{
    const {id} = req.params;
    try{
        if (req.user.id === req.params.id){
            return res.status(400).json({message: "Admins cannot delete themselves"})
        }
        await User.findByIdAndDelete( req.params.id);
        res.status(200).json({message: "User has been deleted"})
    }
   
    catch(e){
         console.log(e);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const promoteUsers = async (req, res)=>{
    console.log("REQ PARAMS:", req.params);
    const {id} = req.params;
    try{
        const user = await User.findById( req.params.id);
        if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

        if (user.role === "admin"){
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