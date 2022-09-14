const VinylController = require('../controllers/vinyl.controller');

module.exports = function(app){
    // CRUD routes
    app.get('/api/vinyls', VinylController.getAllVinyls);
    app.get('/api/vinyls/:id', VinylController.getVinyl);
    app.post('/api/vinyls', VinylController.createVinyl);
    app.put('/api/vinyls/:id', VinylController.updateVinyl);
    app.delete('/api/vinyls/:id', VinylController.deleteVinyl);

}