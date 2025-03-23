<template>
    <div>
      <h1>{{ isEdit ? "Modifier l'emploi" : "Ajouter un emploi" }}</h1>
      <form @submit.prevent="submitForm">
        <label for="title">Titre :</label>
        <input v-model="formData.title" id="title" required />
  
        <label for="description">Description :</label>
        <textarea v-model="formData.description" id="description" required></textarea>
  
        <label for="salary">Salaire :</label>
        <input v-model="formData.salary" id="salary" type="number" required />
  
        <label for="experience">Expérience requise :</label>
        <input v-model="formData.experience" id="experience" required />
  
        <button type="submit">{{ isEdit ? "Modifier" : "Ajouter" }}</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        formData: {
          title: "",
          description: "",
          salary: "",
          experience: "",
        },
        isEdit: false,
      };
    },
    created() {
      if (this.$route.params.id) {
        this.isEdit = true;
        this.fetchJobDetails();
      }
    },
    methods: {
      async fetchJobDetails() {
        const jobId = this.$route.params.id;
        try {
          const response = await fetch(`http://localhost:3000/jobs/${jobId}`);
          const job = await response.json();
          this.formData = { ...job };
        } catch (error) {
          console.error("Erreur lors de la récupération des détails :", error);
        }
      },
      async submitForm() {
        const url = this.isEdit
          ? `http://localhost:3000/jobs/${this.$route.params.id}`
          : "http://localhost:3000/jobs";
        const method = this.isEdit ? "PUT" : "POST";
  
        try {
          await fetch(url, {
            method,
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(this.formData),
          });
          this.$router.push("/");
        } catch (error) {
          console.error("Erreur lors de la soumission du formulaire :", error);
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