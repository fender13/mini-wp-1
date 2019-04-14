Vue.component('image-update', {
  props: ['side-menu', 'update-data'],
  data() {
    return {
      image: '',
      file: '',
      fileName: ''
    }
  },
  mounted() {
    this.image = this.updateData.featured_image
  },
  methods: {
    updateImage() {
      let id = this.updateData._id
      let dataFormat = new FormData();

      dataFormat.append("image", this.$refs.file.files[0])

      axios
        .put(`http://localhost:3000/articles/image/${id}`, dataFormat, {
          headers: {
            token: localStorage.getItem('token'),
            "Content-Type": "multipart/form-data"
          }
        })
        .then(({ data }) => {
          this.$emit('to-view-all-post-after-update-image', data)
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
      <h1>UpdatePost Image</h1>
    </div>
    <div class="input-new-post">
      <form enctype="multipart/form-data" v-on:submit.prevent="updateImage">
        <div class="image-container">
          <img v-bind:src="image" alt="">
        </div>
        <div class="custom-file mt-4">
          <input type="file" ref="file" :value="file" @change="onImageChange()" required/>
        </div>
        <div class="input-new-create mt-5">
          <button type="submit" class="btn btn-outline-success">Update Post Image - Save</button>  
        </div>
      </form>
    </div>
  </div>
  `
})