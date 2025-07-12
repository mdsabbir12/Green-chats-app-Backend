import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

const SecureRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    console.log("token ", token)
    if (!token) {
      return res.status(401).json({ message: "Not Authorized. Token Missing." });
    }

    const verified = jwt.verify(token, process.env.JWT_TOKEN);

    const user = await User.findById(verified.userId).select("-password");
    if (!user) {
      return res.status(403).json({ message: "User Not Found." });
    }

    req.user = user;
    console.log("Sending user from token", user);
    next();
  } catch (error) {
    console.error(error);

    if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Invalid or Expired Token." });
    }
    res.status(500).json({ message: "Internal Server Error." });
  }
};

export default SecureRoute;