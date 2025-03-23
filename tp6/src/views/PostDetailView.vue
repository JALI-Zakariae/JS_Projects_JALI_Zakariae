<template>
  <div>
    <NavBar />
    <h1>{{ post.title }}</h1>
    <p>{{ post.body }}</p>
    <p><strong>Tags :</strong> {{ post.tags.join(", ") }}</p>
    <button @click="deletePost">Supprimer</button>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";

export default {
  components: {
    NavBar,
  },
  data() {
    return {
      post: null, // Détails de l'article
    };
  },
  created() {
    this.fetchPostDetails();
  },
  methods: {
    async fetchPostDetails() {
      const postId = this.$route.params.id;
      try {
        const response = await fetch(`http://localhost:3000/posts/${postId}`);
        this.post = await response.json();
      } catch (error) {
        console.error("Erreur lors de la récupération des détails :", error);
      }
    },
    async deletePost() {
      if (confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
        try {
          await fetch(`http://localhost:3000/posts/${this.post.id}`, {
            method: "DELETE",
          });
          this.$router.push("/");
        } catch (error) {
          console.error("Erreur lors de la suppression :", error);
        }
      }
    },
  },
};
</script>