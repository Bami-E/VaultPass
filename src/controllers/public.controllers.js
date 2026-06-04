

const message = async (req, res)=>{
    return res.status(200).json({message: "This route is public"})
};


module.exports = message;