import { Router } from "express";
import * as userController from "../controllers/user.controller";
import { validate } from "../middlewares/validate";
import { signUpSchema, signInSchema } from "../schemas/user.schema";
import { catchAsync } from "../utils/catchAsync";

const router = Router();

router.post(
  "/sign-up",
  validate(signUpSchema),
  catchAsync(userController.signUp)
);
router.post(
  "/sign-in",
  validate(signInSchema),
  catchAsync(userController.signIn)
);

export default router;
