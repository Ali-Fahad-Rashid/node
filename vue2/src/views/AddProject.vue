<template>
  <form @submit.prevent="handleSubmit" enctype="multipart/form-data">
    <label>Title</label>
    <input type="text" v-model="title" >

            <input id="input" type="file" accept="image/*" @change="uploadFile($event)"  multiple/>

    <label>Details</label>
    <textarea v-model="body" required></textarea>
    <button>Add Project</button>
  </form>
</template>

<script>
import axios from 'axios'
export default {
  
  data() {
    return {
      title: '',
      body: '',
        files: null
    }
  },
  methods: {

       uploadFile(event) {
        this.files = event.target.files
        },


    handleSubmit() {
                const formData = new FormData();
          formData.append('title', this.title)
            formData.append('body', this.body)


                    for (var i = 0; i < this.files.length ; i++) {
 //  for (const i of Object.keys(this.files)) {
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

      }).catch(err => console.log(err))
    }
  }
}
</script>
