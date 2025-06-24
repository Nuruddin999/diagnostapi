const ApiError = require('../exceptions/api-error');
const tokenService = require('../service/token-service');

module.exports = function (req, res, next) {
    try {
        let token;
        const authorizationHeader = req.headers.authorization;
        if (authorizationHeader) {
            token = authorizationHeader;
        }
        if (!token && req.body?.token) {
            token = req.body.token;
        }
        if (!token) {
            return next(ApiError.UnauthorizedError());
        }

        const refreshToken = token.split(' ')[1];
        if (!refreshToken) {
            return next(ApiError.UnauthorizedError());
        }

        const userData = tokenService.validateRefreshToken(refreshToken);
        if (!userData) {
            return next(ApiError.UnauthorizedError());
        }

        req.user = userData;
        next();
    } catch (e) {
        return next(ApiError.UnauthorizedError());
    }
};
