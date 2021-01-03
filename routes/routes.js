// import other routes
const patientsRoutes = require('./patients');

const appRouter = (app, cache, dataChangeEmitter) => {

    // default route
    app.get('/', (req, res) => {
		res.redirect('flow-select.html');
    });

    // // other routes
    patientsRoutes(app, cache, dataChangeEmitter);

};

module.exports = appRouter;