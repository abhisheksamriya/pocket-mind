import { Request, Response, NextFunction } from "express";
import z from "zod";

export const userAuth = (req: Request, res: Response, next: NextFunction) => {
  const User = z.object({
    username: z.string().min(3).max(10),
    password: z.string().min(8).max(20),
  });
  const validUser = User.safeParse(req.body);
  if (!validUser.success) {
    res.status(411).json({
      message: "Error in inputs",
    });
    return;
  }
  next();
};
