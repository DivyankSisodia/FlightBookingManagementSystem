const { User, Role } = require('../models/index');

class UserRepository {
    async create(data) {
        try {
            const user = await User.create(data);
            return user;
        } catch (error) {
            console.log('something went wrong in Repository');
            throw error;
        }
    }

    async destroy(userId) {
        try {
            await User.destroy({
                where: {
                    id: userId
                }
            });
            return true;
        } catch (error) {
            console.log('something went wrong in Repository');
            throw error;
        }
    }

    async getById(userId) {
        try {
            const user = await User.findByPk(userId, {
                attributes: ['email', 'id']
            })
            return user;
        } catch (error) {
            console.log('something went wrong in Repository');
            throw error;
        }
    }

    async getByEmail(userEmail) {
        try {
            const result = await User.findOne({
                where: {
                    email: userEmail
                }
            });
            return result;
        } catch (error) {
            console.log('something went wrong in Repository');
            throw error;
        }
    }

    async isAdmin(userId){
        try {
            const user = await User.findByPk(userId);
            const isAdminRole = await Role.findOne({
                where: {
                    name: 'ADMIN'
                }
            });
            return user.hasRole(isAdminRole);
        } catch (error) {
            console.log('something went wrong in Repository');
            throw error;
        }
    }
}

module.exports = UserRepository;
