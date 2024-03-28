const UserRepository = require('../repository/user-repository');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const { JWT_KEY } = require('../config/ServerConfig');

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async create(data) {
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            console.log('something went wrong in Service');
            throw error;
        }
    }

    async signIn(email, plainPassword) {
        try {
            // step 1: fetch user via email
            const user = await this.userRepository.getByEmail(email);

            // step 2: compare password
            const passwordMatched = this.checkPassword(plainPassword, user.password);

            if (!passwordMatched) {
                throw new Error('Incorrect password');
            }

            // if password matched, then create a token and send it to user
            const newJWT = this.createToken({
                email: user.email,
                id: user.id
            })
            return newJWT;
        } catch (error) {
            console.log('something went wrong in the signIn process')
            throw error;
        }
    }

    createToken(user) {
        try {
            const result = jwt.sign(user, JWT_KEY, { expiresIn: '1h' });
            return result;
        }
        catch (error) {
            console.log('something went wrong in token creation', error);
            throw error;
        }
    }

    verifyToken(token) {
        try {
            const response = jwt.verify(token, JWT_KEY);
            return response;
        } catch (error) {
            console.log('something went wrong in token validation', error);
            throw error;
        }
    }

    checkPassword(userInputPassword, encryptedPassword) {
        try {
            return bcrypt.compareSync(userInputPassword, encryptedPassword);
        } catch (error) {
            console.log('something went wrong in password comparison');
            throw error;
        }
    }

    async isAuthenticated(token) {
        try {
            const response = this.verifyToken(token);
            if (!response) {
                throw new Error('Invalid token');
            }
            const user = await this.userRepository.getById(response.id);
            if (!user) {
                throw new Error('User not found');
            }
            return user.id;
        } catch (error) {
            console.log('something went wrong in auth process');
            throw error;
        }
    }
}

module.exports = UserService;
