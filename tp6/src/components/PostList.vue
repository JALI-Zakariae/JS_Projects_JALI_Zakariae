<template>
  <div>
    <h1>Liste des articles</h1>
    <SinglePost v-for="post in posts" :key="post.id" :post="post" />
  </div>
</template>

<script>
import SinglePost from "./SinglePost.vue";

export default {
  components: {
    SinglePost,
  },
  data() {
    return {
      posts: [], // Liste des articles
    };
  },
  created() {
    this.fetchPosts();
  },
  methods: {
    async fetchPosts() {
      try {
        const response = await fetch("http://localhost:3000/posts");
        this.posts = await response.json();
      } catch (error) {
        console.error("Erreur lors de la récupération des articles :", error);
      }
    },
  },
};
</script>