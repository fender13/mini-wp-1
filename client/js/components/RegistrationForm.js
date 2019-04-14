Vue.component('registration-form', {
  props: ['location', 'is-login'],
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
      errorFirstName: '',
      errorLastName: '',
      errorEmail: '',
      errorUsername: '',
      errorPassword: ''
    }
  },
  methods: {
    userRegister() {
      let dataRegister = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        username: this.username,
        password: this.password
      }

      axios
        .post(`${baseURL}/register`, dataRegister)
          .then(({ data }) => {
            this.firstName = ''
            this.lastName = ''
            this.email = ''
            this.userRegister = ''
            this.password = ''
            this.$root.location = 'home'
            swal("Register berhasil!!", "Harap LOGIN terlebih dahulu untuk melanjutkan!!", "success")
          })
          .catch(({ response }) => {
            if (response.data) {
              if (response.data.firstName != undefined) {
                this.errorFirstName = response.data.firstName.message
              } else {
                this.errorFirstName = ''
              }

              if (response.data.lastName != undefined) {
                this.errorLastName = response.data.lastName.message
              } else {
                this.errorLastName = ''
              }

              if (response.data.email != undefined) {
                this.errorEmail = response.data.email.message
              } else {
                this.errorEmail = ''
              }

              if (response.data.username != undefined) {
                this.errorUsername = response.data.username.message
              } else {
                this.errorEmail = ''
              }

              if (response.data.password != undefined) {
                this.errorPassword = response.data.password.message
              } else {
                this.errorEmail = ''
              }
            }
          })
    }
  },
  template: `
  <div class="register-form">
    <h2><img src="./assets/icon/register.png" alt="Register"> Register</h2>
    <div>
      <form class="form-container" id="form-register" v-on:submit.prevent="userRegister">
        <div class="row">
          <div class="col">  
            <label for="fistName">First Name:</label>
            <input v-model="firstName" type="text" class="form-control mb-2 mr-sm-2" id="firstName" placeholder="Enter First Name">
            <div class="error-member-page" v-if="errorFirstName != ''">
              <p class="error-register">{{ errorFirstName }}</p>
            </div>
          </div>
          <div class="col">
            <label for="lastName">Last Name:</label>
            <input v-model="lastName" type="text" class="form-control mb-2 mr-sm-2" id="lastName" placeholder="Enter Last Name">
            <div class="error-member-page" v-if="errorLastName != ''">
              <p class="error-register">{{ errorLastName }}</p>
            </div>
          </div>
        </div>
        <div class="row mt-2">
          <div class="col">
            <label for="email">Email address</label>
            <input v-model="email" type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email">
            <small id="email" class="form-text text-muted">We'll never share your email with anyone else.</small>
            <div class="error-member-page" v-if="errorEmail != ''">
              <p class="error-register">{{ errorEmail }}</p>
            </div>
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
            <div class="error-member-page" v-if="errorUsername != ''">
              <p class="error-register">{{ errorUsername }}</p>
            </div>
          </div>
        </div>
        <div class="row mt-2">
          <div class="col">
            <label for="password">Password</label>
            <input v-model="password" type="password" id="password-register" class="form-control" placeholder="Enter password">
            <small id="passwordHelpInline" class="text-muted">
            Must be 8-20 characters long.
            </small>
            <div class="error-member-page" v-if="errorPassword != ''">
              <p class="error-register">{{ errorPassword }}</p>
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
          <input type="submit" class="btn btn-primary" value="Register" name="submit-reg" id="submit-register">
        </div>
      </form>
    </div>
  </div>
  `
})