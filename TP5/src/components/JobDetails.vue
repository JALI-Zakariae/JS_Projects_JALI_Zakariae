<template>
    <div>
      <h1>Détails de l'emploi</h1>
      <div v-if="job">
        <h2>{{ job.title }}</h2>
        <p>{{ job.description }}</p>
        <p>Salaire : {{ job.salary }}</p>
        <p>Date de création : {{ job.createdAt }}</p>
        <p>Expérience requise : {{ job.experience }}</p>
        <button @click="editJob">Modifier</button>
        <button @click="deleteJob">Supprimer</button>
      </div>
      <p v-else>Chargement...</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        job: null,
      };
    },
    created() {
      this.fetchJobDetails();
    },
    methods: {
      async fetchJobDetails() {
        const jobId = this.$route.params.id;
        try {
          const response = await fetch(`http://localhost:3000/jobs/${jobId}`);
          this.job = await response.json();
        } catch (error) {
          console.error("Erreur lors de la récupération des détails :", error);
        }
      },
      editJob() {
        this.$router.push(`/edit-job/${this.job.id}`);
      },
      async deleteJob() {
        if (confirm("Êtes-vous sûr de vouloir supprimer cet emploi ?")) {
          try {
            await fetch(`http://localhost:3000/jobs/${this.job.id}`, {
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