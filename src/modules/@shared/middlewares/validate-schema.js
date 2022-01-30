const { InvalidPayloadError } = require('../../../core/errors/invalid-payload')

exports.validateSchemaService = ({ schemaValidate }) => ({
  async handler ({ body }) {
    const { error } = await schemaValidate.validate(body, { abortEarly: false, convert: false })
    if (error) {
      throw new InvalidPayloadError(error.details.map(({ message }) => message))
    }
    return {}
  }
})
