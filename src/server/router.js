const controllers = require('./controllers');

const router = (app) => {
    app.get('/', controllers.index);
    app.get('*', controllers.index);

    app.post('/setMessage', controllers.setMessage);
};

module.exports = router;