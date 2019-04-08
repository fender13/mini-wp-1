Vue.component('login-form', {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  template: `
  <div class="login-form">
    <h2><img src="./assets/icon/login.png" alt="Login"> Login</h2>
    <div>
      <form class="form-container" id="form-login">
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
            <input type="button" class="btn btn-primary" value="Sign In" name="submit-login" id="submit-login">
          </div>
        </div>
      </form>
    </div>
  </div>
  `
})