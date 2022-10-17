<template>

  <div class="project">
    <div class="actions ss">
      <h3 @click="showDetails = !showDetails">{{ project.title }}</h3>
                <img  v-bind:src="'../assets/'+img" alt="" />




<br><br> 
    </div>
    <div v-if="showDetails" class="details">
            <div class="icons">
                    <p>{{ project.body }}</p><br>
<img v-for="imgg in project.images" v-bind:key="imgg" :src="imgg">

<br><br>
        <span @click="deleteProject" class="material-icons">delete</span>
        <router-link class="routerlink" :to="{ name: 'EditProject', params: { id: project._id }}">
          <span class="material-icons btn-warning">edit</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: ['project'],
  data() {
    return {
      showDetails: false,
            uri: 'http://127.0.0.1:3000/api/posts/' + this.project._id,
                img:this.project.images[0]

    }
  },
  methods: {

   deleteProject() {
      fetch(this.uri, { method: 'DELETE' })
        .then(() => {})
        .catch(err => console.log(err))
    },

  },

  
};
</script>
