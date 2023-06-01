import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const authMiddleWare = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(400).json({ message: "Token not found" });
  }

  const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`);
  req.body.user = decoded;

  next();
};

export default authMiddleWare;
