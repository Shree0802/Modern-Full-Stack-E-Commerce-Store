const jwt = require('jsonwebtoken');

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '30d',
  });

  // Set HTTP-only cookie
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: (parseInt(process.env.COOKIE_EXPIRE) || 30) * 24 * 60 * 60 * 1000,
  };

  res.cookie('jwt', token, cookieOptions);
  return token;
};

module.exports = generateToken;
