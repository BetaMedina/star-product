class ProductRepositoryMock {
  constructor () {
    this.productList = [{
      id: 'validProductId'
    }]
  }

  getUserProductById () {
    return false
  }

  save () {
    return true
  }

  listByUserId () {
    return this.productList
  }

  deleteProductById () {
    return true
  }
}
exports.ProductRepositoryMock = ProductRepositoryMock
