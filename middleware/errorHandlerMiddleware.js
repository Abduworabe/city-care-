import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);

  // Set default status and message
  let statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  let msg = err.message || "Something went wrong, try again later";

  // ⭐️ FIX 1: Handle MongoDB Duplicate Key Error (11000) ⭐️
  if (err.code && err.code === 11000) {
    statusCode = StatusCodes.BAD_REQUEST;
    // Customize message for duplicate field (e.g., duplicate email)
    const duplicateValue = Object.keys(err.keyValue);
    msg = `${duplicateValue} field has to be unique`;
  }

  // ⭐️ FIX 2: Handle Validation Errors ⭐️
  if (err.name === "ValidationError") {
    statusCode = StatusCodes.BAD_REQUEST;
    // Join all validation messages (from mongoose validation)
    msg = Object.values(err.errors)
      .map((error) => error.message)
      .join(", ");
  }

  // ⭐️ FIX 3: Handle Rate Limit Error (429) ⭐️
  // When rate limit is exceeded, express-rate-limit sets the status code to 429
  // and the message is the custom 'message' object you defined.
  if (statusCode === StatusCodes.TOO_MANY_REQUESTS) {
    // The rate limiter error structure is usually an object with a 'msg' property,
    // but in modern setups, the err.message is already the string you want.
    // If your rate limiter returns the error message as an object:
    if (err.message && err.message.msg) {
      msg = err.message.msg;
    } else {
      // Otherwise, use the string message it set (e.g., "IP rate limit exceeded...")
      msg = err.message;
    }
  }

  res.status(statusCode).json({ msg });
};

export default errorHandlerMiddleware;
