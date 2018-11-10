// npm packages
import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now,
  }
}, { toJSON: { virtuals: true } });

userSchema.methods.comparePassword = function (condidatePassword, callback) {
  bcrypt.compare(condidatePassword, this.password, (err, isMatch) => {
    if (err) callback(err);
    callback(null, isMatch);
  });
};
userSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
}
userSchema.statics.generateUniqueUserName = async function ({ firstName, lastName }) {
  const User = this;
  const username = `${firstName.toLowerCase()}.${lastName.toLowerCase()}`;
  return new Promise(async (resolve, reject) => {
    const generate = async (username) => {
      const exists = await User.findOne({ username });
      if (exists !== null) {
        generate(`${username}.${Math.floor(Math.random() * 10 + 1)}`);
      } else {
        resolve(username);
      }
    };
    try {
      generate(username);
    } catch (err) {
      reject(err);
    }
  });
};


userSchema.pre('save', function (next) {
  const user = this;
  try {
    const salt = bcrypt.genSaltSync(10, user.password);
    const hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;
    next();
  } catch (error) {
    next(error);
  }
});

export const User = mongoose.model('User', userSchema);
