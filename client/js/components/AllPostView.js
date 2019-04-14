Vue.component('all-post-view', {
  props: ['user-articles'],
  methods: {
    toDashboardUpdateArticle(data) {
      this.$emit('to-dashboard-post-form', data)
    },
    toDashboardUpdateImage(data) {
      this.$emit('to-dashboard-edit-image-form', data)
    },
    deleteArticle(data) {
      let id = data._id

      swal("Are you sure you want to do this?", {
        buttons: ["Oh no!", true],
      })
        .then((result) => {
          if (result == true) {
            return axios
              .delete(`http://localhost:3000/articles/${id}`, {
                headers: {
                  token: localStorage.getItem('token')
                }
              })
          }
        })
        .then(({ data }) => {
          this.$emit('to-view-all-post-after-delete', data)
        })
        .catch(({ response }) => {
          console.log(response)
        })
    }
  },
  template: `
  <div class="dashboard-page">
    <div>
      <h1>All Post</h1>
    </div>
    <div class="table-userpost" v-if="userArticles.length > 0">
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col" class="table-head-no">#</th>
            <th scope="col" class="table-head-title">Title</th>
            <th scope="col" class="table-head-option">Options</th>
          </tr>
        </thead>
        <tbody>
          <tr class="user-post-row" v-for="(item, index) in userArticles" :key="index">
            <td scope="row">{{ index + 1 }}</td>
            <td>{{ item.title }}</td>
            <td>
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Options
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href="#">View Article</a>
                <a class="dropdown-item" href="#" v-on:click.prevent="toDashboardUpdateArticle(item)">Edit Article</a>
                <a class="dropdown-item" href="#" v-on:click.prevent="toDashboardUpdateImage(item)">Edit Image</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#" v-on:click.prevent="deleteArticle(item)">Delete Article</a>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="list-article-empty" v-if="userArticles.length == 0">
      <div>
        <h5>You do not have any article yet. Please add your article!!</h5>
      </div>
      <div>
        <img src="./assets/rocket.png" alt="rocket">
      </div>
    </div>
  </div>
  `
})