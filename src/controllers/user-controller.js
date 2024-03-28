const UserService = require('../services/user-services');

const userService = new UserService();

const create = async (req, res) => {
    try {
        console.log('req.body', req.body);
        const response = await userService.create({
            email: req.body.email,
            password: req.body.password
        });
        return res.status(201).json({
            message: 'User created successfully',
            success: true,
            data: response
        });
    } catch (error) {
        console.error('Error creating user:', error.message); // Log the error message
        return res.status(500).json({
            message: 'Cannot create user',
            success: false,
            err: error.message, // Change to log the error message
            data: {}
        });
    }
}

module.exports = {
    create
}
