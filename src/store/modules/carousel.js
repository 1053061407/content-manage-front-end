const carousel = {
  state: {
    carousel: {
      id: '',
      title: '',
      status: '',
      edit_status: Boolean, // 判断是编辑状态还是创建状态
      content: '',
      type: '1',
      category: '',
      button: {
        text: '',
        url: ''
      },
      img1: {
        moveto: '',
        url: ''
      },
      img2: {
        moveto: '',
        url: ''
      },
      btnContent: '',
      btnUrl: '',
      direction1: '',
      direction2: '',
      backgroundImage: '',
      image_url1: '',
      image_url2: '',
      url: ''
    }
  },

  mutations: {
    setCarousel(state, carousel) {
      state.carousel = carousel
      console.log(carousel)
      console.log(state.carousel)
    }
  }
}
export default carousel
