const jwt = require('jsonwebtoken');
const { Token } = require('../models');
require('dotenv').config()
class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '24h' })
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '60d' })
        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            console.log('userData', userData)
            return userData;
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token) {
        console.log('refr',token)
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return userData;
        } catch (e) {
            return null;
        }
    }

    async saveToken(user, refreshToken) {
        const tokenData = await Token.findOne({ where: { userId: user.id } })
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        const token = await Token.create({ refreshToken, userId: user.id });
        await token.setUser(user)
        return token;
    }

    async removeToken(refreshToken) {
        const tokenData = await Token.destroy({where: { refreshToken }})
        return tokenData;
    }

    async findToken(refreshToken) {
        const tokenData = await Token.findOne({ where: { refreshToken } })
        return tokenData;
    }
}

module.exports = new TokenService();
