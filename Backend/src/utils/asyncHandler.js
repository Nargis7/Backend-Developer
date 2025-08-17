const asyncHandler = (requestHandler)  => {
  return (req,res,next) =>{
    Promise.resolve(requestHandler(req,res,next)).catch((error) => next(error));
  }

};

export default asyncHandler;






// const asyncHandler = () => {}
// const asyncHandler = (func) => () => {}
// const asyncHandler = (func) => async() => {}

// const asyncHandler = (fn) => async (req, res, next) => {
//  try {
//    await fn(req, res, next);
//  } catch (error) {
//    res.status(error.status || 500).json({
//      success: false,
//      status: 'error',
//      message: error.message || 'Internal Server Error',
//    });
//  }
// };

// export default asyncHandler;
