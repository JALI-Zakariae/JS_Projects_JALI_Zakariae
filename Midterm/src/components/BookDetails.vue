<template>
    <div >
      <h1>{{ book.title }}</h1>
      <p>Auteur: {{ book.author }}</p>
      <p>Année: {{ book.year }}</p>
      <p>Résumé: {{ book.summary }}</p>
      <p>Statut: {{ book.status }}</p>
      <button @click="goBack">Retour à la bibliothèque</button>
    </div>
   
  </template>
  
  <script>
  export default {
    props: {
    book: {
      type: Object,
      required: true,
    },
  },
    data() {
      return {
        book: null
      };
    },
    mounted() {
    fetch('/bibliotheque.json')
      .then(response => {
        if (!response.ok) {
          console.error("Erreur de réseau:", response);
          throw new Error('Erreur réseau');
        }
        return response.json();
      })
      .then(data => {
        console.log('Données reçues:', data);
        this.book = data.find(b => b.id === parseInt(this.id));
        console.log('Livre trouvé:', this.book);
      })
      .catch(error => {
        console.error("Erreur lors du chargement du livre:", error);
      });
  },
    methods: {
      goBack() {
        this.$router.push('/');  
      }
    }
  };
  </script>
  
  <style scoped>

  </style>