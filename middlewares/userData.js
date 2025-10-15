const ApiError = require("../exceptions/api-error");
const tokenService = require("../service/token-service");
const getUserData=(req,res, next)=>{
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

    return userData;
}

module.exports = getUserData;

