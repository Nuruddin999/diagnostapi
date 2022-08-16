const userService = require('../service/user-service');
const { validationResult } = require('express-validator');
const ApiError = require('../exceptions/api-error');
const user = require('../models/user');

class UserController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }
            const userData = await userService.registration(req.body);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const userData = await userService.login(email, password);
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async logout(req, res, next) {
        try {
            const { refreshToken } = req.body;
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
            const { refreshToken } = req.body;
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
          const users = await userService.getByLetter(req, res, next);
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
            return res.json({ ok: true });
        } catch (e) {
            next(e);
        }
    }
    async checkIsSuperAdmin(req, res, next) {
        try {
            await userService.checkIsSuperAdmin();
            return res.json({ superAdmin: true });
        } catch (e) {
            return res.json({ superAdmin: false });
        }
    }

    async changeIsDeleted(req, res, next) {
        try {
            const { email } = req.body;
            const userData = await userService.changeIsDeleted(email);
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }
    async getOne(req, res, next) {
        try {
            const userData = await userService.getOne(req, res, next);
            return userData
        } catch (e) {
            next(e);
        }
    }
    async updateRights(req,res,next){
      const {entity, field, value, userId} = req.body
      const result = await userService.updateUserRights(entity, field, value, userId)
      return res.json(result)
    }
}


module.exports = new UserController();
