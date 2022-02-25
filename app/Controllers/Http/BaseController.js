'use strict';

class BaseController {

  async success(response, data = [], message = '', httpStatus = 200) {
    return response.status(httpStatus).send({
      status: 'success',
      message: message,
      data: data
    });
  }

  async error(response, message = '', data = [], httpStatus = 400) {
    return response.status(httpStatus).send({
      status: 'error',
      message: message,
      data: data
    });
  }

}

module.exports = BaseController;