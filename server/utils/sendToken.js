export const sendToken = (res, user, statusCode, message) => {
  const token = user.getJWTToken();
  const options = {
    httpOnly: true,
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 60 * 1000),
  };

  const userData = {
    _id: user._id,
    name: user.name,
    address: user.address,
    lat: user.lat,
    long: user.long,
    orders: user.orders,
  };

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, message, user: userData });
};
