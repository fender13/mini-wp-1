const baseURL = 'http://localhost:3000'
const token = localStorage.getItem('token')

const app = new Vue({
  el: '#app',
  data: {
    location: 'home',
    sideMenu: 'dashboard',
    isLogin: false,
    username: '',
    allArticles: [],
    userArticles: [],
    article: {},
    articleTag: []
  },
  created() {
    let token = localStorage.getItem('token')
    if (token != null) {
      this.verifyToken(token)
    }
  },
  methods: {
    verifyToken(token) {
      axios
        .get(`${baseURL}/verify`, {
          headers: {
            token: token
          }
        })
        .then(({ data }) => {
          this.isLogin = true
          this.location = 'home'
          this.username = data.username

          this.getAllArticles()
          this.getUserArticles()
        })
        .catch(({ response }) => {
          console.log(response)
          if (response.data) {
            if (response.data.message == 'INVALID TOKEN') {
              this.isLogin = false
              this.location = home
              this.username = ''
            }
          }
        })
    },
    getAllArticles() {
      axios
        .get(`${baseURL}/articles`)
        .then(({ data }) => {
          this.allArticles = data
        })
        .catch(({ response }) => {
          console.log(response)
        })
    },
    getUserArticles() {
      axios
        .get(`${baseURL}/articles/user`, {
          headers: { token: token }
        }) 
        .then(({ data }) => {
          this.userArticles = data
        })
        .catch(({ response }) => {
          console.log(response)
        })
    },
    onClickHome() {
      this.location = 'home'
      this.getAllArticles()
    },
    onClickDashboardViewAllAfterCreate(payload) {
      this.userArticles.push(payload)
      this.sideMenu = 'dashboard-view-all'
    },
    onClickDashboardPostForm() {
      this.sideMenu = 'dashboard-update-article'
    },
    onClickViewAllPostAfterUpdate(payload) {
      for (let i = 0; i < this.userArticles.length; i++) {
        if (this.userArticles[i]._id == payload._id) {
          this.userArticles.splice(i, 1)
        }
      }

      this.getUserArticles()
      this.getAllArticles()
      this.sideMenu = 'dashboard-view-all'
    },
    onClickDashboardUpdateImage() {
      this.sideMenu = 'dashboard-update-article-image'
    },
    onClickViewAllPostAfterUpdateImage(payload) {
      for (let i = 0; i < this.userArticles.length; i++) {
        if (this.userArticles[i]._id == payload._id) {
          this.userArticles.splice(i, 1)
        }
      }

      this.getUserArticles()
      this.getAllArticles()
      this.sideMenu = 'dashboard-view-all'
    },
    onRemoveArticle(payload) {
      for (let i = 0; i < this.userArticles.length; i++) {
        if (this.userArticles[i]._id == payload._id) {
          this.userArticles.splice(i, 1)
        }
      }

      this.getAllArticles()
    },
    onClickViewArticle(payload) {
      this.article = payload
      this.location = 'view-article'
    },
    onArticleTag(payload) {
      this.articleTag = payload
      this.location = 'search-by-tag'
    }
  }
})