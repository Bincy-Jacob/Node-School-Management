var express = require('express');
var router = express.Router();

const {
  getStudentDetails,
  postStudentDetails,
  viewStudentDetails,
} = require('./controller');

router.route('/').get(getStudentDetails).post(postStudentDetails);
router.route('/:id').get(viewStudentDetails).put().delete();

module.exports = router;
