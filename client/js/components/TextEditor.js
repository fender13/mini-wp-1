Vue.component('ckeditor', {
  template: `<div class="ckeditor"><textarea :id="id" :value="value"></textarea></div>`,
  props: {
    value: {
      type: String
    },
    id: {
      type: String,
      default: 'editor'
    },
    height: {
      type: String,
      default: '350px',
    },
    toolbar: {
      type: Array,
      default: () => [
        { name: 'document', items: [ 'Source', '-', 'Save', 'NewPage', 'Preview', 'Print', '-', 'Templates' ] },
        { name: 'clipboard', items: [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo' ] },
        { name: 'editing', items: [ 'Find', 'Replace', '-', 'SelectAll', '-', 'Scayt' ] },
        { name: 'forms', items: [ 'Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField' ] },
        { name: 'basicstyles', items: [ 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'CopyFormatting', 'RemoveFormat' ] },
        { name: 'paragraph', items: [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl', 'Language' ] },
        { name: 'links', items: [ 'Link', 'Unlink', 'Anchor' ] },
        { name: 'insert', items: [ 'Image', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak', 'Iframe' ] },
        '/',
        { name: 'styles', items: [ 'Styles', 'Format', 'Font', 'FontSize' ] },
        { name: 'colors', items: [ 'TextColor', 'BGColor' ] },
        { name: 'tools', items: [ 'Maximize', 'ShowBlocks' ] },
        { name: 'about', items: [ 'About' ] }
      ]
    },
    language: {
      type: String,
      default: 'en'
    },
    extraplugins: {
      type: String,
      default: ''
    }
  },
  beforeUpdate () {
    const ckeditorId = this.id
    if (this.value !== CKEDITOR.instances[ckeditorId].getData()) {
      CKEDITOR.instances[ckeditorId].setData(this.value)
    }
  },
  mounted () {
    const ckeditorId = this.id
    console.log(this.value)
    const ckeditorConfig = {
      toolbar: this.toolbar,
      language: this.language,
      height: this.height,
      extraPlugins: this.extraplugins
    }
    CKEDITOR.replace(ckeditorId, ckeditorConfig)
    CKEDITOR.instances[ckeditorId].setData(this.value)
    CKEDITOR.instances[ckeditorId].on('change', () => {
    let ckeditorData = CKEDITOR.instances[ckeditorId].getData()
      if (ckeditorData !== this.value) {
        this.$emit('input', ckeditorData)
      }
    })
  },
  destroyed () {
    const ckeditorId = this.id
    if (CKEDITOR.instances[ckeditorId]) {
      CKEDITOR.instances[ckeditorId].destroy()
    }
  }
})