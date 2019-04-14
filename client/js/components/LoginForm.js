Vue.component('login-form', {
  props: ['location', 'is-login'],
  data() {
    return {
      username: '',
      password: '',
      errorLogin: ''
    }
  },
  methods: {
    userLogin() {
      let dataLogin = {
        username: this.username,
        password: this.password
      }

      axios 
        .post(`${baseURL}/login`, dataLogin)
        .then(({ data }) => {
          localStorage.setItem('token', data.token)
          this.$root.username = data.username
          this.$root.isLogin = true
          this.$root.location = 'home'
          swal("Welcome", data.username, "success")
        })
        .catch(({ response }) => {
          if (response.data) {
            if (response.data.message != undefined) {
              this.errorLogin = response.data.message
            } else {
              this.errorLogin = ''
            }
          }
        })
    }
  },
  template: `
  <div class="login-form">
    <h2><img src="./assets/icon/login.png" alt="Login"> Login</h2>
    <div class="error-login-page" v-if="errorLogin != ''">
      <p class="error-login">{{ errorLogin }}</p>
    </div>
    <div>
      <form class="form-container" id="form-login" v-on:submit.prevent="userLogin">
        <div class="row">
          <div class="col">
            <label for="username">Username</label>
            <div class="input-group mb-2">
              <div class="input-group-prepend">
                <div class="input-group-text">@</div>
              </div>
              <input v-model="username" type="text" class="form-control" id="username-login" placeholder="Enter username">
            </div>
          </div>
        </div>
        <div class="row mt-2">
          <div class="col">
            <div>
              <label for="password">Password</label>
              <input v-model="password" type="password" id="password-login" class="form-control" placeholder="Enter password">
              <small id="passwordHelpInline" class="text-muted">
              Must be 8-20 characters long.
              </small>
            </div>
          </div>
        </div>
        <div class="row mt-2">
          <div class="col">
            <input type="submit" class="btn btn-primary" value="Sign In" name="submit-login" id="submit-login">
          </div>
        </div>
      </form>
    </div>
  </div>
  `
})