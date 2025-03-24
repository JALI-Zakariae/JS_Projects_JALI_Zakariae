<template>
    <div class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <button @click="closeModal" class="close-button">X</button>
        <img :src="book.image" alt="Book Cover" class="book-cover" />
        <h3>{{ book.title }}</h3>
        <p>Auteur: {{ book.author }}</p>
        <p>Année: {{ book.year }}</p>
        <p>Catégorie: {{ book.category }}</p>
        <p>Résumé: {{ book.summary }}</p>
        <p>Statut: <span :class="{'available': book.status === 'available', 'borrowed': book.status === 'borrowed'}">{{ book.status }}</span></p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['book'],
    methods: {
      closeModal() {
        this.$emit('close');
      }
    }
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 400px;
    max-width: 90%;
  }
  
  .book-cover {
    width: 150px;
    height: 200px;
    object-fit: cover;
  }
  
  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: red;
    color: white;
    border: none;
    font-size: 20px;
    cursor: pointer;
  }
  </style>
  