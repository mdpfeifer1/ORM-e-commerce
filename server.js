const express = require('express');
const routes = require('./routes');
// import sequelize connection
// const sequelize = require('./connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
// sequelize.sync({ force: false }).then(() => {
//   console.log('All models synced to the database');
// }).catch((error) => {
//   console.error('Error syncing models to the database:', error);
// });

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
