var express = require('express');
const {
  postSyllabus,
  getSyllabus,
  patchSyllabus,
  viewSyllabus,
  removeSyllabus,
} = require('./controller');

const { addSyllabus } = require('./validation');
var router = express.Router();

router.route('/').get(getSyllabus).post(addSyllabus, postSyllabus);

router
  .route('/:id')
  .get(viewSyllabus)
  .put(addSyllabus, patchSyllabus)
  .delete(removeSyllabus);

module.exports = router;
