import pkg from 'jsonwebtoken';
const { verify, TokenExpiredError } = pkg;
import dotenv from "dotenv";

dotenv.config();
const secret = process.env.JWT_KEY;
const authMiddleWare = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      if (token) {
        const decoded = verify(token, secret);
        console.log(decoded);
        req.body._id = decoded?.id;
      }
    }
    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return res.status(403).json({ message: "Token Expired" });
    }
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export default authMiddleWare;