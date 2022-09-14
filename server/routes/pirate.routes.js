const PirateController = require('../controllers/pirate.controller');

module.exports = function(app){
    // CRUD routes
    app.get('/api/pirates', PirateController.getAllPirates);
    app.get('/api/pirates/:id', PirateController.getPirate);
    app.get('/api/pirates/get/checkCaptain', PirateController.checkForCaptains);
    app.post('/api/pirates', PirateController.createPirate);
    app.put('/api/pirates/:id', PirateController.updatePirate);
    app.delete('/api/pirates/:id', PirateController.deletePirate);

}