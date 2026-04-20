import Joi from "joi";

export const signupSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),

  password: Joi.string()
    .min(6)
    .max(20)
    .required(),


  role: Joi.string()
    .valid("user", "admin", "superAdmin", "doer")
    .default("user"),
});

export const loginSchema = Joi.object({

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),

  password: Joi.string()
    .min(6)
    .max(20)
    .required(),
});

export const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
});


export const changePasswordSchema = Joi.object({
  oldPassword: Joi.string().required(),
  newPassword: Joi.string().min(6).required(),
});