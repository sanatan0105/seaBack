module.exports = (req, res, next) => {
    try {
    
        console.log(JSON.stringify(req.header));
        console.log('---------------------------');
        
        next();
    } catch (error) {
        return res.status(401).json({
            status: "Failed",
            message: 'Unauthorized access'
        });
    }
};
