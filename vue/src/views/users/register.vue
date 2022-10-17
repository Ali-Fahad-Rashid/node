




<template>
  <form @submit.prevent="handleSubmit" enctype="multipart/form-data">
      <label for="User Name">User Name:</label>
      <input type="text" id="title" name="username"  v-model="username" required>
      <label for="User Email">User Email:</label>
      <input type="email" id="snippet" name="email"  v-model="email" required>
      <label for="title">Password:</label>
      <input id="title" type="password" name="password"  v-model="password" required>
      <label for="title">Confirm:</label>
      <input id="title" type="password" name="confirm_pass"  v-model="confirm_pass" required>
            <br><br>
<p>{{error}}</p>


      <button type="submit">Register</button>
      <a href="/login">Login</a>

  </form>
</template>

<script>
import axios from 'axios'

export default {
  
  data() {
    return {
        username: '',
        email: '',
        password: '',
        confirm_pass:'',
        error:''
    }
  },
  methods: {

      

    handleSubmit() {
      if(this.password != this.confirm_pass){
this.error="password are not the same"
      }

else {
     let project = {
        username: this.username,
        email: this.email,
        password: this.password
      }
     axios.post('http://127.0.0.1:3000/api/register',project
      ).then(user => {
                console.log(user);
  
      
        this.$router.push('/');
      }).catch((err,response )=> 
      {
        console.log(err)
      this.error='username exist'

      }
      )
    }}
  }
}
   /*            if(res.statusCode == 400){
this.error= 'error with username or passowrd'
        } */


</script>


