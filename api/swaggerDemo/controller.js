const book = require('../../models/swaggerDemo');

const getBook = async (req, res, next) => {
  let data = await book.find({});
  res.json(data);
};

const getBookById = async (req, res, next) => {
  let { id } = req.params;
  let data = await book.findById(id);
  res.json(data);
};

const postBook = async (req, res, next) => {
  await book.insertMany(req.body);
  res.json({
    success: true,
    msg: 'Added Succesfully',
  });
};

const patchBook = (req, res, next) => {
  let updateData = req.body;

  book.findByIdAndUpdate(req.params.id, updateData, (err) => {
    if (err) {
      return res.json({
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

const removeBook = (req, res, next) => {
  book.findOneAndRemove(req.params.id, (err) => {
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

module.exports = {
  getBook,
  getBookById,
  postBook,
  patchBook,
  removeBook,
};
