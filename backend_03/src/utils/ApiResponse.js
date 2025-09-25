class ApiResponse {
  constructor(statusCode, message = 'Success') {
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.success = statusCode
  }
}

export {ApiResponse};