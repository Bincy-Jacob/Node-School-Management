const course = require('../../../models/course');
const moment = require('moment');

const getCourses = async (req, res, next) => {
  let { id } = req.query;
  let data;

  data = id ? await course.findById(id) : await course.find({});
  // res.render('courseList', { data, moment });
  res.json(data);
};
const getCoursesById = async (req, res, next) => {
  let { id } = req.params;
  let data;

  data = await course.findById(id);
  // res.render('courseList', { data, moment });
  res.json(data);
};
const postCourse = async (req, res, next) => {
  await course.insertMany(req.body);
  res.redirect('/course');
};

const patchCourse = (req, res, next) => {
  let updateData = req.body;

  course.findByIdAndUpdate(req.params.id, updateData, (err) => {
    if (err) {
      res.json({
        success: false,
        msg: "Id dosn't exist",
      });
    }
    res.json({
      success: true,
      msg: 'Added Succesfully',
    });
  });
};

const removeCourse = (req, res, next) => {
  course.findOneAndRemove(req.params.id, (err) => {
    if (!err) {
      res.json({
        status: true,
        message: 'Record Deleted',
      });
    } else {
      res.json({
        status: false,
        message: "Id dosn't exist",
      });
    }
  });
};

const getAddForm = (req, res) => {
  res.render('courseAdd');
};

module.exports = {
  getCourses,
  postCourse,
  patchCourse,
  getCoursesById,
  removeCourse,
  getAddForm,
};
