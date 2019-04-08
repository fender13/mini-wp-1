Vue.component('registration-form', {
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: ''
    }
  },
  template: `
  <div class="register-form">
    <h2><img src="./assets/icon/register.png" alt="Register"> Register</h2>
    <div>
      <form class="form-container" id="form-register">
        <div class="row">
          <div class="col">
            <label for="fistName">First Name:</label>
            <input v-model="firstName" type="text" class="form-control mb-2 mr-sm-2" id="firstName" placeholder="Enter First Name">
          </div>
          <div class="col">
            <label for="lastName">Last Name:</label>
            <input v-model="lastName" type="text" class="form-control mb-2 mr-sm-2" id="lastName" placeholder="Enter Last Name">
          </div>
        </div>
        <div class="row mt-2">
          <div class="col">
            <label for="email">Email address</label>
            <input v-model="email" type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email">
            <small id="email" class="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
        </div>  
        <div class="row mt-2">
          <div class="col">
            <label for="username">Username</label>
            <div class="input-group mb-2">
              <div class="input-group-prepend">
                <div class="input-group-text">@</div>
              </div>
              <input v-model="username" type="text" class="form-control" id="username-register" placeholder="Enter username">
            </div>
          </div>
        </div>
        <div class="row mt-2">
          <div class="col">
            <div>
              <label for="password">Password</label>
              <input v-model="password" type="password" id="password-register" class="form-control" placeholder="Enter password">
              <small id="passwordHelpInline" class="text-muted">
              Must be 8-20 characters long.
              </small>
            </div>
          </div>
        </div>
        <div class="row mt-2">
          <div class="col">
            <div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="invalidCheck2" required>
                <label class="form-check-label" for="invalidCheck2">
                  Agree to terms and conditions
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="row mt-3">
          <input type="button" class="btn btn-primary" value="Register" name="submit-reg" id="submit-register">
        </div>
      </form>
    </div>
  </div>
  `
})