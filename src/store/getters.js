const getters = {
  sidebar: state => state.app.sidebar,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  ruleForm: state => state.article.conditions,
  position: state => state.employment.position,
  carousel: state => state.carousel.carousel
}
export default getters
