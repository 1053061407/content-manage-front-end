const employment = {
  state: {
    position: {
      id: '',
      category: '',
      position: '',
      time: '',
      status: '',
      position_status: '',
      experience: '',
      education: '',
      numbers: '',
      detail: '',
      requirement: '',
      welfare: '',
      location: ''
    }
  },

  mutations: {
    setPosition(state, article) {
      state.position = article
      console.log(article)
      console.log(state.conditions)
    }
  }
}

export default employment
