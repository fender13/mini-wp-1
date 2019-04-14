Vue.component('main-footer', {
  props: ['location'],
  template: `
  <div class="footer" v-if="location != 'dashboard'">
    <div>Copyright © 2019 fender13 - All Rights Reserved </div>
  </div>
  `
})