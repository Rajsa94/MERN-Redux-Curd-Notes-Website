function auth (req, res,next){
    if(req.isAuthenticated()){
        // res.user = req.user
        
        return next()
    }
    return res.redirect('/')
    res.status(201).json({message: "user registration is not success"}) 
}
module.exports = auth