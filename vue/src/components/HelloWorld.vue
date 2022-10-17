<template>
  <div>
    <h2></h2>
    <form @submit.prevent="addArticle" class="mb-3">
      <div class="form-group">
        <input type="text" class="form-control" placeholder="Title" v-model="article.title" required>
      </div>
      
      <div class="form-group">
        <textarea class="form-control" placeholder="" v-model="article.body" required></textarea>
      </div>
      <button type="submit" class="btn btn-primary btn-block">Save</button>
    </form>
    <button @click="clearForm()" class="btn btn-dark btn-block">Cancel</button>

    <div class="card card-body mb-2" v-for="article in articles" v-bind:key="article._id">
      <h3>{{ article.title }}</h3>
      <p>{{ article.body }}</p>
      <hr>
      <button @click="editArticle(article)" class="btn btn-warning mb-2">Edit</button>
      <button @click="deleteArticle(article._id)" class="btn btn-danger">Delete</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      articles: [],
      article: {
        title: '',
        body: ''
      },
      edit: false
    };
  },





  created() {
    this.fetchArticles();
  },
  methods: {
    fetchArticles() {
            let vm = this;

      fetch('http://127.0.0.1:3000/api/posts')
        .then(res => res.json())
        .then(res => {
          vm.articles = res;
        })
    },

    deleteArticle(id) {
        fetch(`http://127.0.0.1:3000/api/posts/${id}`, {
          method: 'delete'
        })
          .then(data => {
            this.fetchArticles();
          })
      
    },


    addArticle() {
        fetch('http://127.0.0.1:3000/api/posts', {
          method: 'post',
          body: JSON.stringify(this.article),
          headers: {
            'content-type': 'application/json'
          }
        })
          .then(data => {
            this.clearForm();
            this.fetchArticles();
          })
        // Update
/*         fetch('api/post', {
          method: 'put',
          body: JSON.stringify(this.article),
          headers: {
            'content-type': 'application/json'
          }
        })
          .then(data => {
            this.clearForm();
            this.fetchArticles();
          })
          .catch(err => console.log(err)); */
      
    },


    editArticle(article) {
      this.edit = true;
      this.article.id = article.id;
      this.article.title = article.post_title;
      this.article.body = article.post_content;
    },
    clearForm() {
      this.edit = false;
      this.article.id = null;
      this.article.title = '';
      this.article.body = '';
    }
  }
};
</script>




