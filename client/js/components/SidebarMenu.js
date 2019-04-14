Vue.component('side-bar-menu-dashboard', {
  methods: {
    toHomePage() {
      // this.$root.location = 'home'
      this.$emit('to-home')
    },
    toDashboardMenu() {
      this.$root.sideMenu = 'dashboard'
    },
    toDashboardAllPost() {
      this.$root.sideMenu = 'dashboard-view-all'
    },
    toDashboardCreatePost() {
      this.$root.sideMenu = 'dashboard-create-new'
    }
  },
  template: `
  <div class="position-fixed nav-side-menu">
    <ul>
      <!-- Sidebar - Brand -->
      <a class="dashboard-title d-flex align-items-center justify-content-center" href="#" v-on:click.prevent="toHomePage">
        <div class="sidebar-brand-text mx-3">My Mini <sup>WP</sup></div>
      </a>

      <!-- Divider -->
      <hr class="sidebar-divider">

      <!-- Nav Item - Dashboard -->
      <li class="nav-item active">
        <a class="nav-link" href="#" v-on:click.prevent="toDashboardMenu">
          <i class="fas fa-fw fa-tachometer-alt"></i>
          <span>Dashboard</span></a>
      </li>

      <!-- Divider -->
      <hr class="sidebar-divider">

      <!-- Nav Item - Dashboard -->
      <li class="nav-item active">
        <a class="nav-link" href="#" v-on:click.prevent="toDashboardAllPost">
          <i class="fas fa-list"></i>
          <span>All Post</span></a>
      </li>

      <!-- Divider -->
      <hr class="sidebar-divider">

      <!-- Nav Item - Dashboard -->
      <li class="nav-item active">
        <a class="nav-link" href="#" v-on:click.prevent="toDashboardCreatePost">
          <i class="fas fa-plus"></i>
          <span>Add New Post</span></a>
      </li>

      <!-- Divider -->
      <hr class="sidebar-divider">
    </ul>
  </div>
  `
})