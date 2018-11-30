
export const protectRoute = async (req, res, next) => {
  if(req.user) next();
  return res.status(401);
};
