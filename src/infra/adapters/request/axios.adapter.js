const httpStatus = require('http2').constants
const axios = require('axios')

class RequestAdapter {
  async get ({ url, config }) {
    try {
      const response = await axios.get(url, config)
      return {
        data: response.data,
        status: response.status
      }
    } catch (err) {
      const errorResponse = {
        status: err.response ? err.response.status : httpStatus.HTTP_STATUS_INTERNAL_SERVER_ERROR,
        data: err.response ? err.response.data : err.message,
        error: true

      }
      return errorResponse
    }
  }
}

exports.RequestAdapter = new RequestAdapter()
