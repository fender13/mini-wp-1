Vue.component('view-by-tags', {
  props: ['location', 'is-login', 'article-tag'],
  methods: {
    goToSinglePostByTag(id) {
      axios
        .get(`http://localhost:3000/articles/${id}`)
        .then(({ data }) => {
          this.$emit('to-single-article-by-tag', data)
        })
        .catch(({ response }) => {
          console.log(response)
        })
    }
  },
  template: `
  <div class="home-post" v-if="location == 'search-by-tag'">
    <div class="home-title">
      <h1>View By Tags</h1>
    </div>
    <div class="post-card">
      <div class="row">
        <div class="col-md-4 col-sm-6" v-for="(item, index) in articleTag" :key="index">
          <div class="product-grid top-buffer" v-for="article in item.ArticleId">
            <div class="card mb-3">
              <img class="card-img-top" v-bind:src="article.featured_image" alt="Card image cap">
              <div class="card-body post-title">
                <a href="#" v-on:click.prevent="goToSinglePostByTag(article._id)"><h5>{{ article.title }}</h5></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `
})