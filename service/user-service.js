const { User, Token } = require('../models');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mail-service');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');
const ApiError = require('../exceptions/api-error');

class UserService {
    async registration(body) {
        console.log(JSON.stringify(body))
        const candidate = await User.findOne({
            where: {
                email: body.email
            }
        })
        if (candidate) {
            throw ApiError.BadRequest(`Пользователь с почтовым адресом ${body.email} уже существует`)
        }
        const password = await bcrypt.hash(body.password, 10);
        console.log('hashed', password)
        await User.create({ ...body, password })
        return { user: 'registrated' }
    }

    async activate(activationLink) {
        const user = await User.findOne({ activationLink })
        if (!user) {
            throw ApiError.BadRequest('Неккоректная ссылка активации')
        }
        user.isActivated = true;
        await user.save();
    }

    async login(email, password) {
        const user = await User.findOne({ where: { email } })
        if (!user) {
            throw ApiError.BadRequest('Пользователь с таким email не найден')
        }
        console.log('passwpass', password + " " + user.password)
        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw ApiError.BadRequest('Неверный пароль');
        }
        const { email: userEmail, name, speciality, phone, role } = user
        const userDto = new UserDto({ email: user.email, id: user.id, isActivated: true });
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(user, tokens.refreshToken);
        return { ...tokens, user: { email: userEmail, name, speciality, phone, role } }
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        console.log('back refsreshtoken',refreshToken)
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await Token.findOne({ where: { refreshToken } });
        console.log('userData', userData)
        console.log('tokenFromDb', tokenFromDb)

        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }
        const user = await User.findOne({ where: { id:userData.id } });
        const { email: userEmail, name, speciality, phone, role } = user
        const userDto = new UserDto({ email: user.email, id: user.id, isActivated: true });
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(user, tokens.refreshToken);
        return { ...tokens, user: { email: userEmail, name, speciality, phone, role } }
    }

    async getAllUsers() {
        const users = await User.find();
        return users;
    }
}

module.exports = new UserService();
