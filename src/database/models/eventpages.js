'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class eventPages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  eventPages.init({
    pageName: DataTypes.STRING,
    upcomingEvents: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'eventPages',
  });
  return eventPages;
};