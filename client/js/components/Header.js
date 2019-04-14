Vue.component('header-template', {
  props: ['location', 'is-login'],
  methods: {
    toHomePage() {
      this.$root.location = 'home'
    },
    toMemberArea() {
      this.$root.location = 'member-area'
    },
    toDashboardMenu() {
      this.$root.location = 'dashboard'
    }
  },
  template: `
  <div class="main-header">
    <div class="header-container">
      <div class="main-logo">
        <a href="/" v-on:click.prevent="toHomePage"><img src="./assets/site-logo.png" alt=""></a>
      </div>
      <div class="main-menu">
        <ul>
          <li><a href="#" v-on:click.prevent="toHomePage">Home</a></li>
          <li><a href="#">Blog</a></li>
          <li><a href="#">Portofolio</a></li>
          <li><a href="#">Our Story</a></li>
          <li><a href="#">Contact Us</a></li>
        </ul>
      </div>
      <div class="side-menu">
        <div class="dashboard-menu" v-if="isLogin">
          <a href="#" v-on:click.prevent="toDashboardMenu">Dashboard</a>
        </div>
        <div class="login-button-header" v-if="!isLogin">
          <button class="button button1" v-on:click.prevent="toMemberArea">Sign In</button>
        </div>
        <div class="logout-button-header" v-if="isLogin">
          <button class="button button1">Sign Out</button>
        </div>
      </div>
    </div>
  </div>
  `
})