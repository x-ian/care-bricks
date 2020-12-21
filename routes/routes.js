// import other routes
const patientsRoutes = require('./patients');

const appRouter = (app, fs, cache) => {

    // default route
    app.get('/', (req, res) => {
        // res.send('welcome to the development api-server');
		res.redirect('flow-select.html');
    });

    // // other routes
    patientsRoutes(app, fs, cache);

};

module.exports = appRouter;