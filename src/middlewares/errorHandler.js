function errorHandler(err, req, res, next) {
  console.error(err.stack); // log error for debugging

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Something went wrong!",
  });
}

export default errorHandler;
