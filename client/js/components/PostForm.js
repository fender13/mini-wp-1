Vue.component('post-form', {
  props: ['side-menu'],
  data() {
    return {
      title: '',
      tags: [],
      content: '',
      file: '',
      limit: 10,
      fileName: ''
    }
  },
  methods: {
    addNewPost() {
      let dataFormat = new FormData();

      dataFormat.append("title", this.title)
      dataFormat.append("image", this.$refs.file.files[0])
      dataFormat.append("tags", this.tags)
      dataFormat.append("content", this.content)

      axios
        .post('http://localhost:3000/articles/upload', dataFormat, {
          headers: {
            token: localStorage.getItem('token'),
            "Content-Type": "multipart/form-data"
          }
        })
        .then(({ data }) => {
          this.title = ''
          this.tags = []
          this.content = ''
          this.file = ''
          this.fileName = ''

          this.$emit('to-dashboard-view-all', data)
        })
        .catch(({ response }) => {
          console.log(response)
        })
    },
    onImageChange() {
      this.fileName = this.$refs.file.files[0].name
    }
  },
  template: `
  <div class="dashboard-page">
    <div>
      <h1>Create New Post</h1>
    </div>
    <div class="input-new-post">
      <form enctype="multipart/form-data" v-on:submit.prevent="addNewPost">
        <div class="form-group">
          <input v-model="title" type="text" class="form-control" aria-label="Large" aria-describedby="inputGroup-sizing-sm" placeholder="Enter Title Here">
        </div>
        <div class="form-group mt-4">
          <input-tag placeholder="Add Tags seperate with enter or coma - limit 10" v-model="tags" :limit="limit"></input-tag>
        </div>
        <div class="form-group mt-4">
          <ckeditor v-model="content"></ckeditor>
        </div>
        <div class="custom-file mt-4">
          <input type="file" ref="file" :value="file" @change="onImageChange()" required/>
        </div>
        <div class="input-new-create mt-5">
          <button type="submit" class="btn btn-outline-success">Create New Post - Save</button>  
        </div>
      </form>
    </div>
  </div>
  `
})