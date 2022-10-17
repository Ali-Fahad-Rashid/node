<template>
  <div class="home">
    <div v-if="projects.length">
      <div v-for="project in projects" :key="project._id">
      <SingleProject :project="project" />
      </div>
    </div>
  </div>
</template>

<script>
// challenge
//   - when the filter changes, only show those projects
//   - e.g. if we click 'completed' only show completed project
//   - use a computed property to do this

import SingleProject from '../components/SingleProject.vue'
import axios from 'axios'


export default {
  name: 'Home',
  components: { SingleProject },
  data() {
    return {
      projects: [],
    };
  },
  mounted() {
    axios.get('http://localhost:3000/api/posts')
      .then(data => this.projects = data.data)
      .catch(err => console.log(err))

           //     createToast('Welcome')



  },


}
</script>
