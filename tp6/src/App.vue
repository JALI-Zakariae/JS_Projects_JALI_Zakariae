<template>
  <div id="app">
    <!-- Ajout de la NavBar -->
    <NavBar />
    <!-- Contenu des vues -->
    <router-view></router-view>
  </div>
</template>

<script>
// Importation du composant NavBar
import NavBar from "./components/NavBar.vue";

export default {
  name: "App",
  components: {
    NavBar, // Enregistrement du composant NavBar
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>