Vue.component('member-area', {
  data() {
    return {
      login_menu: true
    }
  },
  methods: {
    gotToLoginForm() {
      this.login_menu = true
    },
    gotToRegisterForm() {
      this.login_menu = false
    }
  },
  template: `
  <div class="page member-area">
    <div class="member-container">
      <div class="member-area">
        <div class="container">
          <div class="row">
            <div class="col-6 member-area">
              <div>
                <div class="member-title">
                  <h2>Login - Register</h2>
                </div>
                <div class="introduce">
                  <p style="text-align: center;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </div>
                <div class="log-button" v-if="!login_menu">
                  <button @click="gotToLoginForm" class="btn btn-primary page-member onLogin-button">Login</button>
                </div>
                <div class="reg-button" v-if="login_menu">
                  <button @click="gotToRegisterForm" class="btn btn-primary page-member onRegister-button">Register</button>
                </div>
              </div>
            </div>
            <div class="col-6">
              <login-form v-if="login_menu"></login-form>
              <registration-form v-if="!login_menu"></registration-form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `
})