class RequestAdapterStub {
  post ({ data, url, config }) {
    return {
      data: { message: 'success' },
      status: 200
    }
  }
}
exports.RequestAdapterStub = RequestAdapterStub
