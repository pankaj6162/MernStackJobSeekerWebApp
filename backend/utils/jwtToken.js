export const sendToken = (user, statusCode, res, message) => {
  // Check if user is authenticated
  if (!user) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const token = user.getJWTToken();
  const options = {
    expires: new Date(Date.now() + 40 * 60 * 60 * 100000),
    secure: true;
    httpOnly: true, // Set httpOnly to true
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    message,
    token,
  });
};

