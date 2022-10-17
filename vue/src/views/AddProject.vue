<template>
  <form @submit.prevent="handleSubmit" enctype="multipart/form-data">
    <label>Title</label>
    <input type="text" v-model="title" >
    <label>Details</label>
    <textarea v-model="body" required></textarea>
    <button>Add Project</button>
  </form>
</template>

<script>
import axios from 'axios'
import { createToast } from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css'
export default {
  
  data() {
    return {
      title: '',
      body: '',
    }
  },
  methods: {
    handleSubmit() {
                const formData = new FormData();
          formData.append('title', this.title)
            formData.append('body', this.body)


                    for (var i = 0; i < this.files.length ; i++) {
            formData.append('files', this.files[i])
          }

   let project = {
        title: this.title,
        body: this.body,
        files: this.files
      }

      console.log(project)

for (var value of formData.values()) {
   console.log(value);
}
     axios.post('http://127.0.0.1:3000/api/posts',formData
      ).then(() => {

        this.$router.push('/')
                                createToast('Post added successfully')

      }).catch(err => console.log(err))
    }
  }
}
</script>
