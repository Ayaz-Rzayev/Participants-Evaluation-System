const express = require('express');
const router = express.Router();
//Controllers
const {
  renderProjects,
  renderNewProject,
  createProject,
  renderEditProject,
  editProject,
  deleteProject,
  renderRate,
  rate,
  renderEditRate,
  editRate,
  renderRates,
  submitRates,
  renderResults} = require('../controllers/projects')
//Middleware
const {isLogedIn, isAdmin, validateProject}  = require('../middleware')


router.route('/')
  .get(isLogedIn, renderProjects)
  .post(isLogedIn, isAdmin, validateProject, createProject);

router.get('/new', isLogedIn, isAdmin, renderNewProject);

router.get('/:id/edit', isLogedIn, isAdmin, renderEditProject);

router.route('/:id')
  .put(isLogedIn, isAdmin, validateProject, editProject)
  .delete(isLogedIn, isAdmin, deleteProject);

// Rate
//add logic so only participants and admin can enter --done in view
router.get('/:id/rate', isLogedIn,  renderRate);

router.post('/rate', isLogedIn, rate);

router.route('/:id/rate/edit')
  .get(isLogedIn, renderEditRate)
  .put(isLogedIn, editRate);

router.route('/:id/rates')
  .get(isLogedIn, isAdmin, renderRates)
  .post(isLogedIn, isAdmin, submitRates);


router.get('/:id/results', isLogedIn, isAdmin, renderResults);

module.exports = router;