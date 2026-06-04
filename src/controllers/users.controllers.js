


const profile = async(req,res)=>{

  res.status(200).json({message:"Profile fetched", user:req.user});
};

module.exports = profile;