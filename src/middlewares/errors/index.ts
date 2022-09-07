function errorHandler(err, req, res, next) {
  console.log("middleware",err);
  res.status(401).send({ 
    message: err.message 
  });
}

export default errorHandler;