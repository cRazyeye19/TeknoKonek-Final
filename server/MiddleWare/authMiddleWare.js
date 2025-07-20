import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secret = process.env.JWT_KEY;
const authMiddleWare = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      if (token) {
        const decoded = jwt.verify(token, secret);
        console.log(decoded);
        req.body._id = decoded?.id;
      }
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

export default authMiddleWare;