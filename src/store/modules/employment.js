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
    setPosition(state, position) {
      state.position = position
      console.log(position)
      console.log(state.position)
    }
  }
}

export default employment
