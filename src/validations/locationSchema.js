import * as yup from "yup";
//
export const locationSchema = yup.object().shape({
  name: yup.string().required(),
  picture: yup.string(),
  location: yup.object().shape({
    type: yup.string().required(),
    coordinates: yup.array().of(yup.string())
  }).required(),
});
