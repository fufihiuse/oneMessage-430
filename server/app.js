// import libraries
const express = require('express');
const compression = require('compression');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const expressHandlebars = require('express-handlebars');
const router = require('./router.js');
const { socketSetup } = require('./io.js');

const dbURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1/oneMessage';

mongoose.connect(dbURI).catch((err) => {
  if (err) {
    console.log('Could not connect to database');
    throw err;
  }
});

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const app = express();

app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', expressHandlebars.engine({
  defaultLayout: '',
}));
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/../views`);

app.use(favicon(`${__dirname}/../hosted/img/favicon.png`));
app.use('/assets', express.static(`${__dirname}/../hosted`));

router(app);

const server = socketSetup(app);

server.listen(port, (err) => {
  if (err) {
    throw err;
  }
  console.log(`Listening on port ${port}`);
});
