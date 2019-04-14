Vue.component('mainheader-template', {
  props: ['location', 'is-login'],
  template: `
  <div v-if="location != 'dashboard' && location != 'allpost'">
    <topbar-template></topbar-template>
    <header-template
      v-bind:location="location"
      v-bind:is-login="isLogin" 
    ></header-template>
  </div>
  `
})