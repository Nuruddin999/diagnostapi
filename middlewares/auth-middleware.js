const ApiError = require('../exceptions/api-error');
const getUserData = require("./userData");

module.exports = function (req, res, next) {
    try {
        req.user = getUserData(req, res, next);
        if (req.user.role === 'charity') {
            return next(ApiError.UnauthorizedError());
        }
        next();
    } catch (e) {
        return next(ApiError.UnauthorizedError());
    }
};
