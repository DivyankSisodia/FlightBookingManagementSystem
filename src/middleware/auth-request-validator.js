const validateUserAuth = (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({
            message: 'Email and password are required',
            success: false,
            data: {},
            err: 'email or password missing in the request'
        });
    }
    next();
}
module.exports = {
    validateUserAuth
}