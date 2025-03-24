<template>
    <div>
      <h1>Bibliothèque Universitaire</h1>
  
      <input type="text" v-model="searchQuery" placeholder="Rechercher par titre ou auteur" />
      
      <select v-model="statusFilter">
        <option value="">Tous</option>
        <option value="true">Disponible</option>
        <option value="false">Emprunté</option>
      </select>
  
      <div class="book-list">
        <div 
          v-for="book in filteredBooks" 
          :key="book.id" 
          class="book-card">
          <h3>{{ book.title }}</h3>
          <p>Auteur: {{ book.author }}</p>
          <p>Année: {{ book.year }}</p>
          <p>Statut: <span :class="{'available': book.status === true, 'borrowed': book.status === false}">{{ book.status ? 'Disponible' : 'Emprunté' }}</span></p>
  
          
          

        </div>
      </div>
    </div>
  </template>
  
  <script>
import BookDetails from '@/components/BookDetails.vue';

 
  export default {
    data() {
      return {
        searchQuery: '',
        statusFilter: '', 
        books: []  
      };
    },
    computed: {
      filteredBooks() {
        return this.books.filter(book => {
          const matchesQuery = book.title.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
                               book.author.toLowerCase().includes(this.searchQuery.toLowerCase());
          const matchesStatus = this.statusFilter === '' || 
                               (this.statusFilter === 'true' && book.status === true) || 
                               (this.statusFilter === 'false' && book.status === false);
          return matchesQuery && matchesStatus;
        });
      }
    },
    mounted() {
      fetch('/bibliotheque.json')
        .then(response => response.json())
        .then(data => {
          this.books = data.livres;
        })
        .catch(error => {
          console.error("Erreur lors du chargement des livres:", error);
        });
    }
  };
  </script>
  
  <style scoped>
  .book-list {
    display: flex;
    flex-wrap: wrap;
  }
  
  .book-card {
    border: 1px solid #ccc;
    padding: 10px;
    margin: 10px;
    width: 200px;
  }
  
  .available {
    color: green;
  }
  
  .borrowed {
    color: red;
  }
  </style>
  
  
  
  
  