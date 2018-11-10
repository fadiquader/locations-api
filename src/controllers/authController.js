import * as db from '../models';
import { generateToken } from '../utils';

export const authController = {};

authController.signup = async (req, res) => {
  const { firstName, lastName } = req.body;
  const user = new db.User(req.body);
  const username = await db.User.generateUniqueUserName({
    firstName,
    lastName,
  });
  user.username = username;
  await user.save();
  delete user.password;
  const token = generateToken(user);
  return res.json({
    data: user.toJSON(),
    token
  })
}

authController.signin = async (req, res) => {
  const { email, password } = req.body;
  const errorResponse = (msg) => {
    res.status(500).json({
      success: false,
      message: msg || 'Invalid credentials',
    });
  };
  const user = await db.User.findOne({
    email
  });
  if(!user) {
    return errorResponse('The user is not registered in the system')
  }
  user.comparePassword(password, async (err, isMatch) => {
    if (err || !isMatch) {
      return errorResponse('Wrong Email or Password!');
    }
    const token = generateToken(user);
    res.status(200).json({
      success: true,
      data: user.toJSON(),
      token,
    });
  });
};
