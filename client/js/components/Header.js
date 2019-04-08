Vue.component('header-template', {
  template: `
  <div class="main-header">
    <div class="header-container">
      <div class="main-logo">
        <a href="/"><img src="./assets/site-logo.png" alt=""></a>
      </div>
      <div class="main-menu">
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Blog</a></li>
          <li><a href="#">Portofolio</a></li>
          <li><a href="#">Our Story</a></li>
          <li><a href="#">Contact Us</a></li>
        </ul>
      </div>
      <div class="side-menu">
        <div class="dashboard-menu">
          <a href="#">Dashboard</a>
        </div>
        <div class="login-button-header">
          <button class="button button1">Sign In</button>
        </div>
      </div>
    </div>
  </div>
  `
})