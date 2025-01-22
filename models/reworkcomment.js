'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ReworkComment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            ReworkComment.belongsTo(models.Smeta, {
                foreignKey: 'smetaId',
                onDelete: 'CASCADE'
            })
            ReworkComment.hasMany(models.ReworkCommentFile, {
                foreignKey: 'reworkCommentId',
                onDelete: 'cascade'
            })
        }
    }

    ReworkComment.init({
        comment: DataTypes.TEXT,
        smetaId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'ReworkComment',
    });
    return ReworkComment;
};