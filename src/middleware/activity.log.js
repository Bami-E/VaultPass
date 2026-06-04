const ActivityLog =
require("../models/ActivityLog");

const logActivity =
async(action,user,ipAddress)=>{

    await ActivityLog.create({
        action,
        user,
        ipAddress
    });
};

module.exports = logActivity;