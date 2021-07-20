const express = require('express');
const movieController = require('../controllers/controllers');

const router = express.Router();

router.route('/movies').get(movieController.getMovies);
router.route('/movies/:id').get(movieController.getMovie);
router.route('/movies').post(movieController.postMovie);
router.route('/movies/:id').put(movieController.putMovie);
router.route('/movies/:id').delete(movieController.deleteMovie);

module.exports = router;
