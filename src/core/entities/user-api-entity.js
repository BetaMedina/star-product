class UserApiEntity {
  constructor ({
    id,
    email,
    id_user,
    api_key,
    is_homolog
  }) {
    this.id = id
    this.email = email
    this.idUser = id_user
    this.apiKey = api_key
    this.isHomolog = is_homolog
  }
}
exports.UserApiEntity = UserApiEntity
