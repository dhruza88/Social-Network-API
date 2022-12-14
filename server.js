const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const cwd = process.cwd();

console.log("PID", process.pid)

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

console.log(db);
db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
    });
});