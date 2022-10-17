<template>
  <div class="project">
    <div class="actions ss">
      <h3 @click="showDetails = !showDetails">{{ project.title }}</h3>
    </div>
    <div v-if="showDetails" class="details">
            <div class="icons">
                    <p>{{ project.body }}</p>
        <span @click="deleteProject" class="material-icons">delete</span>
        <router-link class="routerlink" :to="{ name: 'EditProject', params: { id: project._id }}">
          <span class="material-icons btn-warning">edit</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['project'],
  data() {
    return {
      showDetails: false,
            uri: 'http://127.0.0.1:3000/api/posts/' + this.project._id,
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
