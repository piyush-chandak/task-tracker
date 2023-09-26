const express = require('express');
const handleApi = require('../utils/handleApi');
const validate = require('../middlewares/validate');
const { taskValidation } = require('../validations');
const { taskController } = require('../controllers');

const router = express.Router();

router
  .route('/')
  .get(validate(taskValidation.getAllTasks), handleApi(taskController.getAllTasks))
  .post(validate(taskValidation.createTask), handleApi(taskController.createTask));

router.put('/:id', validate(taskValidation.updateTask), handleApi(taskController.updateTask));

router.get('/meterics', validate(taskValidation.getMeterics), handleApi(taskController.getMeterics));

module.exports = router;
