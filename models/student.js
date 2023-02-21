const mongoose = require('mongoose');
const { Schema } = mongoose;

const Marks = new Schema({
  science: Number,
  social: Number,
  maths: Number,
});

const Student = new Schema(
  {
    roll_no: Number,
    full_name: String,
    skills: [
      {
        type: String,
      },
    ],
    marks: [Marks],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('student', Student);
