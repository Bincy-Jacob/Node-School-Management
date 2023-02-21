const teacher = require('../../../models/teachers');

const getTeachers = async (req, res, next) => {
  const page = req.query.p || 0;
  const perPage = 10;

  let obj = {};
  let url = req.query;

  if (url.id) obj._id = url.id;

  if (url.start_date)
    obj.start_date = { $gte: new Date(url.start_date).setHours(0, 0, 0, 0) };

  if (url.end_date)
    obj.start_date = {
      ...obj.start_date,
      $lte: new Date(url.end_date).setHours(11, 59, 59, 59),
    };

  if (url.course_id) obj.course_id = url.course_id;

  if (url.first_name) obj.first_name = new RegExp(url.first_name, 'i');

  if (url.last_name) obj.last_name = new RegExp(url.last_name, 'i');

  // let data = await teacher
  // .find(obj)
  // .find(obj, { first_name: 1, last_name: 1, _id: 0 })
  // .select('first_name last_name start_date ')
  // .populate('course_id')
  // .skip(page * perPage)
  // .limit(perPage);

  let data = await teacher.aggregate([
    {
      $lookup: {
        from: 'courses',
        localField: 'course_id',
        foreignField: '_id',
        as: 'course_details',
      },
    },
    // {
    //   $unwind: { path: '$course_details', preserveNullAndEmptyArrays: true },
    // },
    {
      $sort: { qualification: 1 },
    },
    {
      $skip: page * perPage,
    },
    {
      $limit: perPage,
    },
  ]);
  res.json(data);
};

const postTeacher = (req, res, next) => {
  const Teacher = new teacher(req.body);

  Teacher.save((err) => {
    if (err) {
      res.json({
        success: false,
        msg: 'Error occured',
      });
    } else {
      res.redirect('/teacher');
    }
  });
};

const patchTeacher = (req, res, next) => {
  let updateData = req.body;

  teacher.findByIdAndUpdate(req.params.id, updateData, (err) => {
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

const deleteTeacher = (req, res, next) => {
  teacher.findOneAndRemove(req.params.id, (err) => {
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
  res.render('teacherAdd');
};

module.exports = {
  getTeachers,
  postTeacher,
  patchTeacher,
  deleteTeacher,
  getAddForm,
};
