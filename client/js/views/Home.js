Vue.component('home', {
  props: ['location', 'is-login', 'all-articles'],
  data() {
    return {
      data: {}
    }
  },
  methods: {
    checkSingleArticle(payload) {
      this.data = {}
      this.data = payload
      this.$emit('go-to-single-article', this.data)
    }
  },
  template: `
  <div v-if="location == 'home'">
    <div id="carousel" class="carousel slide main-slider" data-ride="carousel">
      <ol class="carousel-indicators">
        <li data-target="#" data-slide-to="0" class="active"></li>
        <li data-target="#" data-slide-to="1"></li>
        <li data-target="#" data-slide-to="2"></li>
        <li data-target="#" data-slide-to="3"></li>
        <li data-target="#" data-slide-to="4"></li>
      </ol>
      <div class="carousel-inner">
        <div class="carousel-item active slider-img">
          <img src="./assets/slider/01.jpg" class="w-100" style="height: 600px" alt="01">
        </div>
        <div class="carousel-item slider-img">
          <img src="./assets/slider/02.jpg" class="w-100" style="height: 600px" alt="02">
        </div>
        <div class="carousel-item slider-img">
          <img src="./assets/slider/03.jpg" class="w-100" style="height: 600px" alt="03">
        </div>
        <div class="carousel-item slider-img">
            <img src="./assets/slider/04.jpg" class="w-100" style="height: 600px" alt="04">
          </div>
          <div class="carousel-item slider-img">
              <img src="./assets/slider/05.jpg" class="w-100" style="height: 600px" alt="05">
            </div>
      </div>
      <a class="carousel-control-prev" href="#carousel" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#carousel" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
    <home-post
      v-bind:all-articles="allArticles"
      v-on:to-single-article="checkSingleArticle"
      >
    </home-post>
  </div>
  `
})