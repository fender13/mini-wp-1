Vue.component('main-dashboard', {
  props: ['location', 'is-login', 'username', 'side-menu', 'user-articles'],
  data() {
    return{
      data: {},
    }
  },
  methods: {
    toHomePage() {
      this.$root.location = 'home'
    },
    toDashboardMenu() {
      this.$root.location = 'dashboard'
    },
    checkData(payload) {
      this.data = {}
      this.data = payload
      this.$emit('go-to-dashboard-update-form', this.data)
    },
    checkCreateData(payload) {
      this.data = {}
      this.data = payload
      this.$emit('go-to-view-all-post-after-create', this.data)
    },
    checkUpdateData(payload) {
      this.data = {}
      this.data = payload
      this.$emit('go-to-view-all-post-after-update', this.data)
    },
    checkUpdateImageData(payload) {
      this.data = {}
      this.data = payload
      this.$emit('go-to-dashboard-edit-image-form', this.data)
    },
    checkUpdateImage(payload) {
      this.data = {}
      this.data = payload
      this.$emit('go-to-view-all-post-after-update-image', this.data)
    },
    checkDeleteArticle(payload) {
      this.data = {}
      this.data = payload
      this.$emit('go-to-view-all-post-after-delete-article', this.data)
    }
  },
  template: `
  <div class="main-dashboard" v-if="location == 'dashboard'">
    <div class="d-flex">
      <div class="col-2 sidebar-menu">
        <side-bar-menu-dashboard
          v-on:to-home="$emit('go-to-home')"
          >
        </side-bar-menu-dashboard>
      </div>
      <div class="col-10">
        <div class="row topbar-menu-dashboard">
          <div class="dropdown dropdown-topbar">
            <a class="btn dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {{ username }}
            </a>
            <div class="dropdown-menu">
              <a class="dropdown-item" type="button" v-on:click.prevent="toHomePage">Home</a>
              <a class="dropdown-item" type="button">Another action</a>
              <a class="dropdown-item" type="button">Something else here</a>
            </div>
          </div>
        </div>
        <div class="row dashboard-content">
          <dashboard-view
            v-if="sideMenu == 'dashboard'"
            >
          </dashboard-view>

          <all-post-view
            v-if="sideMenu == 'dashboard-view-all'"
            v-bind:user-articles="userArticles"
            v-on:to-dashboard-post-form="checkData"
            v-on:to-dashboard-edit-image-form="checkUpdateImageData"
            v-on:to-view-all-post-after-delete="checkDeleteArticle"
            >
          </all-post-view>

          <post-form
            v-bind:side-menu="sideMenu"
            v-bind:update-data=data
            v-if="sideMenu == 'dashboard-create-new'"
            v-on:to-dashboard-view-all="checkCreateData"
            >
          </post-form>

          <update-form
            v-bind:side-menu="sideMenu"
            v-bind:update-data=data
            v-if="sideMenu == 'dashboard-update-article'"
            v-on:to-view-all-post-after-update="checkUpdateData"
            >
          </update-form>

          <image-update 
            v-bind:side-menu="sideMenu"
            v-bind:update-data=data
            v-if="sideMenu == 'dashboard-update-article-image'"
            v-on:to-view-all-post-after-update-image="checkUpdateImage"
            >
          </image-update>
        </div>
      </div>
    </div>
  </div>
  `
})