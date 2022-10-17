




<template>
  <form @submit.prevent="handleSubmit" enctype="multipart/form-data">
      <label for="User Name">User Name:</label>
      <input type="text" id="title" name="username"  v-model="username">

      <label for="title">Password:</label>
      <input id="title" type="password" name="password"  v-model="password">
      <br><br>
<p>{{error}}</p>
      <button>login</button>
      <a href="/Register">Register</a>

  </form>
</template>

<script>
import axios from 'axios'
import { createToast } from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css'

export default {
  
  data() {
    return {
        username: '',
        email: '',
        password: '',
        confirm_pass:'',
        error:""
    }
  },
  methods: {
    handleSubmit() {
   let project = {
        username: this.username,
        password: this.password
      }
     axios.post('http://127.0.0.1:3000/api/login',project
      ).then(res => {
      //  console.log(res.statusCode)
              if(res.statusCode == 400){
this.error= 'error with username or passowrd...'
        }

        if(res.data.user.username){

        localStorage.setItem('user', res.data.user.username);
        this.$router.push('/')
                createToast('Welcome'+'  '+res.data.user.username)

                setTimeout(()=>{window.location.reload()}, 1000)

}
  
      }).catch(err => 
      {console.log(err)
      this.error= 'error with username or passowrd'
      }
      )
    }
  }
}
</script>
