const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const demoSchema = new Schema(
  {
    studentName: {
      type: String,
      require: [true, 'Studen Name is must'],
    },
    marks: [
      {
        type: Number,
        require: true,
      },
    ],
    creditMark: {
      type: Number,
      require: true,
      default: 0,
    },
    courseId: {
      type: ObjectId,
      ref: 'courses',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('aggregrateDemo', demoSchema);
