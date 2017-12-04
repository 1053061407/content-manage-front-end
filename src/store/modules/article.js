const article = {
  state: {
    conditions: {
      id: '',
      title: '',
      subtitle: '',
      time: '',
      category: '',
      cover: '',
      content: '',
      article_status: ''
    }
  },

  mutations: {
    setConditions(state, article) {
      state.conditions = article
      console.log(article)
      console.log(state.conditions)
    }
  }
}
export default article
