const express = require('express');

const taskRoute = require('./task.route');
const docRoute = require('./docs.route');

const router = express.Router();

router.use('/tasks', taskRoute);
router.use('/docs', docRoute);

module.exports = router;
