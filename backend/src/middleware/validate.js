export const validate = (schema) => {
  return (req, res, next) => {

    // 🔥 FIRST FIX (MOST IMPORTANT)
    if (!req.body) {
      return res.status(400).json({
        success: false,
        message: "Request body is missing",
      });
    }

    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errors = error.details.map((err) => ({
        field: err.path[0],
        message: err.message.replace(/"/g, ""),
      }));

      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors,
      });
    }

    req.body = value;
    next();
  };
};