Vue.component('update-form', {
  props: ['side-menu', 'update-data'],
  data() {
    return {
      title: '',
      tags: [],
      content: '',
      limit: 10
    }
  },
  mounted() {
    this.title = this.updateData.title
    this.tags = this.updateData.tags
    this.content = this.updateData.content
  },
  methods: {
    updateArticle() {
      let id = this.updateData._id
      
      let dataUpdate = {
        title: this.title,
        tags: this.tags,
        content: this.content
      }

      axios
        .put(`http://localhost:3000/articles/${id}`, dataUpdate, {
          headers: { token: localStorage.getItem('token') }
        })
        .then(({ data }) => {
          this.$emit('to-view-all-post-after-update', data)
        })
        .catch(({ response }) => {
          console.log(response)
        })
    }
  },
  template: `
  <div class="dashboard-page">
    <div>
      <h1>Update Post</h1>
    </div>
    <div class="input-new-post">
      <form v-on:submit.prevent="updateArticle">
        <div class="form-group">
          <input v-model="title" type="text" class="form-control" aria-label="Large" aria-describedby="inputGroup-sizing-sm" placeholder="Enter Title Here">
        </div>
        <div class="form-group mt-4">
          <input-tag placeholder="Add Tags seperate with enter or coma - limit 10" v-model="tags" :limit="limit"></input-tag>
        </div>
        <div class="form-group mt-4">
          <ckeditor v-model="content"></ckeditor>
        </div>
        <div class="input-new-create mt-5">
          <button type="submit" class="btn btn-outline-success">Update Post - Save</button>  
        </div>
      </form>
    </div>
  </div>
  `
})