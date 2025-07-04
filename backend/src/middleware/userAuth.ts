import { Request, Response, NextFunction } from "express";
import z from "zod";

const UserSchema = z.object({
  username: z
    .string()
    .email("Enter a valid email")
    .min(6, "Email must be at least 6 characters")
    .max(20, "Email can't exceed 20 characters"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password can't exceed 20 characters"),
});

export const userAuth = (req: Request, res: Response, next: NextFunction) => {
  const result = UserSchema.safeParse(req.body);

  if (!result.success) {
    const error = result.error.flatten();
    console.log(error);

    if (error.fieldErrors.username && error.fieldErrors.username.length) {
      res.status(411).json({ message: error.fieldErrors.username[0] });
      return;
    }

    if (error.fieldErrors.password && error.fieldErrors.password.length) {
      res.status(411).json({ message: error.fieldErrors.password[0] });
      return;
    }

    res.status(411).json({ message: "Invalid inputs" });
    return;
  }

  next();
};
