Vue.component('home-post', {
  props: ['all-articles'],
  methods: {
    goToSinglePost(id) {
      axios
        .get(`http://localhost:3000/articles/${id}`)
        .then(({ data }) => {
          this.$emit('to-single-article', data)
        })
        .catch(({ response }) => {
          console.log(response)
        })
    }
  },
  template: `
  <div class="home-post">
    <div class="home-title">
      <h1>See Our latest Articles</h1>
    </div>
    <div class="post-card">
      <div class="row">
        <div class="col-md-4 col-sm-6" v-for="(item, index) in allArticles.slice().reverse()" :key="index">
          <div class="product-grid top-buffer">
            <div class="card mb-3">
              <img class="card-img-top" v-bind:src="item.featured_image" alt="Card image cap">
              <div class="card-body post-title">
                <a href="#" v-on:click.prevent="goToSinglePost(item._id)"><h5>{{ item.title }}</h5></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `
})