<template>
  <form @submit.prevent="handleSubmit">
    <label>Title</label>
    <input type="text" v-model="title" required>
    <label>Details</label>
    <textarea v-model="body" required></textarea>
    <button>Update Project</button>
  </form>
</template>

<script>


export default {
  props: ['id'],
  data() {
    return {
      uri: 'http://127.0.0.1:3000/api/posts/' + this.id,
      title: '',
      body: '',
    }
  },
  mounted() {
    fetch(this.uri)
      .then(res => res.json())
      .then(data => {
        this.title = data.title
        this.body = data.body
      }).catch(err => console.log(err))
  },
  methods: {
    handleSubmit() {
      fetch(this.uri, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: this.title, body: this.body })
      }).then(() => {
        this.$router.push('/')
      }).catch(err => console.log(err))
    }
  }
}
</script>
