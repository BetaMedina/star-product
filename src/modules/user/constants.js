const CONSTANTS = {
  CREATE_USER: {
    SAVE_ERROR: 'User already exists',
    USER_CREATED: 'User created with success'

  },
  UPDATE_USER: {
    UPDATE_ERROR: 'Processing has error, pleasy try again later',
    USER_UPDATED: 'User updated'

  },
  READ_USER: {
    USER_NOT_FOUND: 'user details not found'
  },
  DELETED_USER: {
    ERROR_ON_DELETE: 'User cant been delete, pleasy try again later'
  }
}

exports.CONSTANTS = Object.freeze(CONSTANTS)
