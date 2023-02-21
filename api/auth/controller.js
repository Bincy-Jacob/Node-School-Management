const jwt = require('jsonwebtoken');
const User = require('../../models/login');

exports.createUser = async (req, res, next) => {
  try {
    let isExist = await User.findOne({ email: req.body.email });
    // console.log(isExist);
    if (!isExist) {
      const salt = await User.generateSalt();
      req.body.password = await User.hashPassword(req.body.password, salt);
      req.body.salt = salt;
      console.log('req.body====', req.body);

      await User.create(req.body);

      return res.json({
        status: true,
        msg: 'Created Sucessfully',
      });
    } else
      res.json({
        status: false,
        msg: 'User already exist',
      });
  } catch (error) {
    res.json({
      status: false,
      msg: error.message,
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.json({
        status: false,
        msg: 'Invalid Email or Password',
      });

    if (!(await User.verifyPassword(password, user.password, user.salt)))
      return res.json({
        status: false,
        msg: 'Invalid Email or Password',
      });

    const accessTocken = User.genarateAuthTocken(user);
    const refreshTocken = User.genarateAuthTocken(user);

    user.accessTocken = accessTocken;
    const newLogin = new User(user);
    let newData = await newLogin.save();

    return res.json({
      status: true,
      msg: 'Logged in Sucessfully',
      data: {
        newData,
        accessTocken,
        refreshTocken,
      },
    });
  } catch (error) {
    res.json({
      status: false,
      msg: error.message,
    });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.send('User not found');

    const token = jwt.sign(
      { id: user._id, email },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: '1m',
      }
    );
    const link = `http://localhost:5000/auth/reset-password/${token}`;

    res.send(link);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

exports.resetpassword = async (req, res, next) => {
  try {
    const { accessToken } = req.params;
    const decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decodedToken.id);
    if (!user) res.json({ success: false, message: "User Doesn't Exist" });
    user.password = await User.hashPassword(req.body.password, user.salt);
    const newUser = new User(user);
    const response = await newUser.save();
    return res.json({ success: true, response });
  } catch (err) {
    return res.json({ success: false, message: err });
  }
};

exports.logout = async (req, res, next) => {};
