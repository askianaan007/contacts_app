//6
//7 in constant.js
const { constants } = require("../constant");
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500; //6.1
  switch (
    statusCode //6.3
  ) {
    case constants.VALIDATION_ERROR:
      res.json({
        title: "Validation fail",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.NOT_FOUND:
      res.json({
        title: "Not Found",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.UNAUTHORIZED:
      res.json({
        title: "unAuthorized",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.FORBIDDEN:
      res.json({
        title: "forbidden",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.SERVER_ERROR:
      res.json({
        title: "server error",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    default:
      console.log("No error All good !");
      break;
  }

  //   res.json({ title: "Not Found", message: err.message, stackTrace: err.stack }); //6.2
  //   res.json({ title: "Validation fail", message: err.message, stackTrace: err.stack }); //6.2
};

module.exports = errorHandler;
