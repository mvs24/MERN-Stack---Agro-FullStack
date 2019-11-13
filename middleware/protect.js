const protect = (...access) => {
    return (req, res, next) => {
        if(access.includes(req.user.role)){
           return next();
        } else {
            return res.status(400).json({protect: false, message: "You do not have permission to do this action"});
        }
    }
}

module.exports = { protect };