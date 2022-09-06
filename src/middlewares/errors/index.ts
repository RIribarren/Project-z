function errorHandler(err, req, res, next) {
  console.log("middleware",err.message);
  res.status(401).send(err.message);
}

export default errorHandler;