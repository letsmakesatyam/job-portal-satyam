import jwt from "jsonwebtoken"
export const isAuthenticated = async(req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "No token provided", success: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded.id) {
      return res.status(401).json({ message: "Invalid token payload", success: false });
    }
    req._id = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token", success: false });
  }
};
