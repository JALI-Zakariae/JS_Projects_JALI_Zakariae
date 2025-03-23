<template>
  <div class="tag-cloud">
    <h3>Tags</h3>
    <router-link
      v-for="tag in tags"
      :key="tag"
      :to="`/tags/${tag}`"
      class="tag"
    >
      {{ tag }}
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tags: [], // Liste des tags
    };
  },
  created() {
    this.fetchTags();
  },
  methods: {
    async fetchTags() {
      try {
        const response = await fetch("http://localhost:3000/posts");
        const posts = await response.json();
        const allTags = posts.flatMap((post) => post.tags);
        this.tags = [...new Set(allTags)]; // Supprime les doublons
      } catch (error) {
        console.error("Erreur lors de la récupération des tags :", error);
      }
    },
  },
};
</script>

<style scoped>
.tag-cloud {
  padding: 10px;
  background-color: #f9f9f9;
}
.tag {
  display: inline-block;
  margin: 5px;
  padding: 5px 10px;
  background-color: #e0e0e0;
  border-radius: 5px;
  text-decoration: none;
  color: #333;
}
</style>