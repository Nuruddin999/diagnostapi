const userService = require('../service/user-service');
const {validationResult} = require('express-validator');
const ApiError = require('../exceptions/api-error');
const {UserSession, Application} = require('../models');

class UserController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }
            const userData = await userService.registration(req.body);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body;
            const userData = await userService.login(email, password);
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.body;
            const token = await userService.logout(refreshToken);
            return res.json(token);
        } catch (e) {
            next(e);
        }
    }

    async activate(req, res, next) {
        try {
            const activationLink = req.params.link;
            await userService.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL);
        } catch (e) {
            next(e);
        }
    }

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.body;
            const userData = await userService.refresh(refreshToken);
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async getUsers(req, res, next) {
        try {
            const users = await userService.getByLetter(req, res, next);
            return users;
        } catch (e) {
            next(e);
        }
    }

    async getAllUsers(req, res, next) {
        try {
            const users = await userService.getAllUsers(req, res, next);
            return users;
        } catch (e) {
            next(e);
        }
    }

    async deleteUser(req, res, next) {
        try {
            const user = await userService.deleteUser(req, res, next);
            return user;
        } catch (e) {
            next(e);
        }
    }

    async checkUser(req, res, next) {
        try {
            return res.json({ok: true});
        } catch (e) {
            next(e);
        }
    }

    async checkIsSuperAdmin(req, res, next) {
        try {
            await userService.checkIsSuperAdmin();
            return res.json({superAdmin: true});
        } catch (e) {
            return res.json({superAdmin: false});
        }
    }

    async changeIsDeleted(req, res, next) {
        try {
            const {email} = req.body;
            const userData = await userService.changeIsDeleted(email);
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async getOne(req, res, next) {
        try {
            const userData = await userService.getOne(req, res, next);
            return res.json(userData)
        } catch (e) {
            next(e);
        }
    }

    async updateRights(req, res, next) {
        const {entity, field, value, userId} = req.body
        const result = await userService.updateUserRights(entity, field, value, userId)
        return res.json(result)
    }

    async updatePrimeData(req, res, next) {
        const {email, phone, speciality, name} = req.body
        const result = await userService.updateUserPrimaryData(email, speciality, phone, name)
        return res.json(result)
    }

    async getOneForSmeta(req, res, next) {
        try {
            const {urlSignPath, signFileName, name} = await userService.getOne(req, res, next);
            return res.json({urlSignPath, signFileName, name})
        } catch (e) {
            next(e);
        }
    }

    async saveStartTime(req, res, next) {
        try {
            const nowTime = new Date();
            const userId = req.user.id
            const lastSession = await UserSession.findOne({
                where: {
                    userId,
                },
                order: [['createdAt', 'DESC']],
            })


            if (!lastSession) {
                const result = await UserSession.create({userId, connectedAt: nowTime});
                return res.json({id: result.id})
            }
            if (!lastSession.disconnectedAt) {
                return res.json({id: lastSession.id})
            }
            const diffMinutes = (nowTime - new Date(lastSession.disconnectedAt)) / 1000 / 60;
            if (diffMinutes < 5) {
                lastSession.disconnectedAt = null;
                await lastSession.save();
                return res.json({id: lastSession.id})
            } else {
                const result = await UserSession.create({userId, connectedAt: nowTime});
                return res.json({id: result.id})
            }

        } catch (e) {
            next(e);
        }
    }

    async saveEndTime(req, res, next) {
        try {

            const {sessionId, id} = req.body
            const nowTime = new Date();
            const session = await UserSession.findAll({
                where: {
                    id: sessionId,
                },
                raw: true
            });
            const start = session[0].connectedAt;
            const durationMs = new Date() - new Date(session[0].connectedAt);
            if (durationMs < 5000) {
                // Очень быстрая перезагрузка — не записываем disconnectedAt
                return res.json({skip: true});
            }
            const duration = nowTime - start;
            const result = await UserSession.update({
                disconnectedAt: nowTime,
                durationSeconds: duration
            }, {where: {id: sessionId}});
            if (req.body.id) {
                const foundAppl = await Application.findOne({
                    where: {id}
                })
                const total = (foundAppl.dataValues.duration || 0) + req.body.duration
                await Application.update({duration: total}, {where: {id}});
            }
            return res.json({id: result})
        } catch (e) {
            next(e);
        }
    }
}


module.exports = new UserController();
