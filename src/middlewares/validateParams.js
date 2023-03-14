const validateParams = (schema, property) => (req, res, next) => {
  const options = {
    abortEarly: false,
    errors: {
      wrap: {
        label: "",
      },
    },
  };
  const { error, value } = schema.validate(req[property], options);
  if (error) {
    const { details } = error;
    const { message } = details[0];
    res.status(422).json({ message, status: "fail" });
  } else {
    req[property] = value;
    next();
  }
};
export default validateParams;
