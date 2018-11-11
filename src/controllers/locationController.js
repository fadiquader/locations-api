import * as db from '../models';
import { locationSchema } from '../validations/locationSchema';
import { formatYupError} from '../utils/formatYupError';

export const locationController = {};

locationController.create = async (req, res) => {
  const data = req.body;
  const userId = req.user._id;
  try {
    await locationSchema.validate(data, { abortEarly: false });
  }
  catch (err) {
    const errors = formatYupError(err);
    return res.status(422).json({
      success: false,
      errors,
    })
  }
  if(userId) {
    data.userId = userId;
  }
  const location = new db.Location(data);
  await location.save();
  res.status(200).json({
    data: location,
    success: true
  })
};

locationController.findAll = async (req, res) => {
  const locations = await db.Location.find();
  res.status(200).json({
    data: locations,
    success: true
  })
};

locationController.getById = async (req, res) => {
  const { id } = req.params;
  const location = await db.Location.findById(id);
  res.status(200).json({
    data: location,
    success: !!location
  })
};

locationController.deleteById = async (req, res) => {
  const { id } = req.params;
  const location = await db.Location.findByIdAndRemove(id);
  res.status(200).json({
    data: location,
    success: true
  })
};

locationController.deleteAll = async (req, res) => {
  await db.Location.remove({});
  res.status(200).json({
    success: true
  })
};
