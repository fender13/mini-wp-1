Vue.component('view-single-article', {
  props: ['location', 'is-login', 'article'],
  methods: {
    getArticlesByTag(tag) {
      axios
        .get(`http://localhost:3000/articles/set-tag/${tag}`)
        .then(({ data }) => {
          this.$emit('to-view-articles-by-tag', data)
        })
        .catch(({ response }) => {
          console.log(response)
        })
    }
  },
  template: `
  <div class="single-article" v-if="location == 'view-article'">
    <div class="image-article">
      <img v-bind:src="article.featured_image" alt="">
    </div>
    <div class="main-article">
      <div class="article-title">
        <h1>{{ article.title }}</h1>
      </div>
      <div class="article-content">
        <p v-html="article.content">{{ article.content }}</p>
      </div>
      <div class="tag-article">
        <p>Tags: <span class="w3-tag w3-blue main-tag" v-for="(tag, index) in article.tags"><a href="#" v-on:click.prevent="getArticlesByTag(tag)">{{ tag }}</a></span></p>
      </div>
    </div>
  </div>
  `
})