'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ReworkCommentFile extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            ReworkCommentFile.belongsTo(models.ReworkComment, {
                foreignKey: 'reworkCommentId',
                onDelete: 'CASCADE'
            })
        }
    }

    ReworkCommentFile.init({
        url: DataTypes.TEXT,
        type: DataTypes.STRING,
        reworkCommentId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'ReworkCommentFile',
    });
    return ReworkCommentFile;
};