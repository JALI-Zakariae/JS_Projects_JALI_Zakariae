<template>
    <div>
      <h1>Liste des emplois disponibles</h1>
      <button @click="goToAddJob">Ajouter un emploi</button>
      <ul>
        <li v-for="job in jobs" :key="job.id">
          <router-link :to="`/job/${job.id}`">{{ job.title }}</router-link>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        jobs: [], 
      };
    },
    created() {
      this.fetchJobs();
    },
    methods: {
      async fetchJobs() {
        try {
          const response = await fetch("http://localhost:3000/jobs");
          this.jobs = await response.json();
        } catch (error) {
          console.error("Erreur lors de la récupération des emplois :", error);
        }
      },
      goToAddJob() {
        this.$router.push("/add-job");
      },
    },
  };
  </script>
  
  <style scoped>
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    margin: 10px 0;
  }
  </style>