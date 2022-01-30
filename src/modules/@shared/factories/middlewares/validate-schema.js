const { validateSchemaService } = require('../../middlewares/validate-schema')

exports.schemaValidateMiddlewareFactory = ({ schemaValidate }) => {
  return validateSchemaService({
    schemaValidate
  })
}
