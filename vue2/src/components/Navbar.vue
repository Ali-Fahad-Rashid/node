<template>
  <nav class="main-nav">
    <router-link v-if="!user" :to="{name: 'login'}">Login</router-link>
     <router-link v-if="!user" :to="{name: 'register'}">Register</router-link>
     <a v-for="u in uu" v-bind:key="u.name">{{u.name}}</a>
     <a v-if="user" @click="handleSubmit">LogOut</a>

    <router-link :to="{ name: 'Home' }">Projects</router-link>
    <router-link :to="{ name: 'AddProject' }">Add a New Project</router-link>
  </nav>


  
</template>

<script>
import axios from 'axios'
import {mapActions} from 'vuex';
import {mapGetters} from 'vuex';
export default {
data(){
  return {
user:localStorage.getItem('user')
  }
},
computed:{
/*      users(){
            return this.$store.state.users;
        }, */

/*      uu () {
    return this.$store.getters.uu
  }    */

         ...mapGetters([
            'uu'
        ]) , 



},

methods: {

    handleSubmit() {

       axios.post('http://127.0.0.1:3000/api/logout'
      ).then(user => {
        localStorage.removeItem('user');

        this.$router.push('/')
        this.$router.go()
      }).catch(err => console.log(err))

    }
}

}
</script>
