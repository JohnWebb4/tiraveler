const Sequelize = require('sequelize');

const databaseUrl = process.env.DATABASE_URL || `mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@localhost/TIRavelerDB?reconnect=true`;
const database = new Sequelize(databaseUrl, {
  dialect: 'mysql',
});

const Event = require('./schemas/Event')(database, Sequelize);
const Itinerary = require('./schemas/Itinerary')(database, Sequelize);
const User = require('./schemas/User')(database, Sequelize);
const ItinEvents = require('./schemas/ItinEvents')(database, Sequelize);

database.sync({ force: false });

module.exports = {
  Event,
  Itinerary,
  User,
  ItinEvents,
  Sequelize: database,
};
