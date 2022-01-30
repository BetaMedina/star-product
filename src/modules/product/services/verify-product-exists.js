exports.createApikey = ({ requestAdapter }) => ({
  async verifyProductExists ({ productId }) {
    const httpResponse = await requestAdapter.get({ url: `${process.env.PRODUCT_URL}/${productId}/`, config: {} })
    if (httpResponse.error) return false
    return true
  }
})
