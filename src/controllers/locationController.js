import * as fs from 'fs';
import uuidv4 from 'uuid/v4'
import path from 'path';
// ----
import * as db from '../models';
import { locationSchema } from '../validations/locationSchema';
import { formatYupError} from '../utils/formatYupError';

export const locationController = {};

locationController.create = async (req, res) => {
  const data = req.body;
  const userId = req.user ? req.user._id : null;
  try {
    data.location = {
      type: 'Point',
      coordinates: [data.location.latitude, data.location.longitude],
    };
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
  // console.log(data.name)
  if(data.picture) {

    const dir = path.join(__dirname, '../images');
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
    }
    try {
      const base64Data = data.picture.replace(/^data:image\/jpeg;base64,/, '');
      const fileName = `${uuidv4()}.jpeg`;
      fs.writeFileSync(`${dir}/${fileName}`, base64Data, 'base64');
      data.picture = fileName;
    } catch (e) {
      return res.status(422).json({
        success: false,
        errors,
      })
    }
  }
  const location = new db.Location(data);
  await location.save();
  res.status(200).json({
    data: location,
    success: true
  })
};

locationController.findAll = async (req, res) => {
  const host = req.protocol + "://" + req.get('host') || '';
  const locations = (await db.Location.find()).map(loc => loc.toJSON(host));
  res.status(200).json({
    locations,
    success: true
  })
};

locationController.getById = async (req, res) => {
  const { id } = req.params;
  const host = req.protocol + "://" + req.get('host') || '';
  const location = await db.Location.findById(id);
  res.status(200).json({
    data: location.toJSON(host),
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
