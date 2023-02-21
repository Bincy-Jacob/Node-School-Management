const syllabus = require('../../../models/syllabus');
const { isValidObjectId } = require('mongoose');

const postSyllabus = async (req, res, next) => {
  let isExistSyllabus = await syllabus.find({
    syllabusCode: req.body.syllabusCode,
  });

  if (isExistSyllabus.length > 0) res.json({ msg: 'Syllabus already exist' });
  else {
    let isExistCourse = await syllabus.find({
      courseId: req.body.courseId,
    });

    if (!isExistCourse) res.json({ msg: 'This Course is not exist' });
    else {
      await syllabus.insertMany(req.body);
      res.redirect('/syllabus');
    }
  }
};

const getSyllabus = async (req, res, next) => {
  let data = await syllabus.aggregate([
    {
      $lookup: {
        from: 'courses',
        localField: 'courseId',
        foreignField: '_id',
        as: 'course',
      },
    },
  ]);
  res.json(data);
};

const patchSyllabus = async (req, res, next) => {
  let { id } = req.params;
  let updateData = req.body;

  let isExist = await syllabus.findById({ _id: id });

  if (!isExist) res.json({ msg: 'No syllabus with this Id' });
  else {
    console.log('first');
    syllabus.findByIdAndUpdate(id, updateData, (err) => {
      if (err) res.json({ msg: "Id dosn't exist" });
      else res.redirect('/syllabus');
    });
  }
};

const viewSyllabus = async (req, res, next) => {
  let { id } = req.params;
  if (isValidObjectId(id)) {
    syllabus
      .findById({ _id: id })
      .then((data) => {
        if (data) res.json(data);
        else res.json({ msg: 'No syllabus with this Id' });
      })
      .catch((err) => res.json(err));
  } else res.json({ msg: 'NOT a valid object id' });
};

const removeSyllabus = async (req, res) => {
  let { id } = req.params;
  syllabus.findByIdAndDelete(id, (err) => {
    if (err) res.json(err);
    else res.redirect('/syllabus');
  });
};
module.exports = {
  postSyllabus,
  getSyllabus,
  patchSyllabus,
  viewSyllabus,
  removeSyllabus,
};
