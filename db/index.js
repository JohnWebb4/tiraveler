const Sequelize = require('sequelize');

const database = new Sequelize('TIRavelerDB', 'root', '', {
  dialect: 'mysql',
});

const Event = require('./schemas/Event')(database, Sequelize);
const Itinerary = require('./schemas/Itinerary')(database, Sequelize);
const User = require('./schemas/User')(database, Sequelize);

Event.belongsToMany(Itinerary, { through: 'itineraryEvent' });
Itinerary.belongsToMany(Event, { through: 'itineraryEvent' });
Itinerary.belongsTo(User);
User.hasMany(Itinerary);

database.sync({ force: false });

module.exports = {
  Event,
  Itinerary,
  User,
  Sequelize: database,
};
