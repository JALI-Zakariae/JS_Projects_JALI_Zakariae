<template>
  <div>
    <NavBar />
    <h1>Ajouter un article</h1>
    <form @submit.prevent="submitForm">
      <label for="title">Titre :</label>
      <input v-model="formData.title" id="title" required />

      <label for="body">Contenu :</label>
      <textarea v-model="formData.body" id="body" required></textarea>

      <label for="tags">Tags :</label>
      <input v-model="formData.tags" id="tags" placeholder="Séparés par des virgules" required />

      <button type="submit">Ajouter</button>
    </form>
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
      formData: {
        title: "",
        body: "",
        tags: "",
      },
    };
  },
  methods: {
    async submitForm() {
      const tagsArray = this.formData.tags.split(",").map((tag) => tag.trim());
      const postData = {
        ...this.formData,
        tags: tagsArray,
      };

      try {
        await fetch("http://localhost:3000/posts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        });
        this.$router.push("/");
      } catch (error) {
        console.error("Erreur lors de l'ajout de l'article :", error);
      }
    },
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: auto;
}
label {
  margin-top: 10px;
}
input,
textarea {
  margin-bottom: 10px;
}
</style>