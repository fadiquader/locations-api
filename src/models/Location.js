import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  picture: String,
  location: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  _creator: {
    type: mongoose.Types.ObjectId
  }
});

locationSchema.methods.toJSON = function(host) {
  const obj = this.toObject();
  if(obj.picture) {
    obj.picture = `${host}/images/${obj.picture}`;
  }
  return obj;
}
export const Location = mongoose.model('Location', locationSchema);
