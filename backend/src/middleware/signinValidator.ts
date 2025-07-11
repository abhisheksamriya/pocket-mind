import z from "zod";
import { Request, Response, NextFunction } from "express";
const SigninSchema = z.object({
  email: z.string().email().min(6).max(30),
  password: z.string().min(6).max(20),
});
export const signinValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = SigninSchema.safeParse(req.body);

  if (!result.success) {
    const error = result.error.flatten();
    const fieldErrors = error.fieldErrors;

    if (fieldErrors.email?.length) {
      res.status(411).json({ message: fieldErrors.email[0] });
      return;
    }
    if (fieldErrors.password?.length) {
      res.status(411).json({ message: fieldErrors.password[0] });
      return;
    }

    res.status(411).json({ message: "Invalid credentials" });
    return;
  }

  next();
};
