<template>
  <nav>
    <router-link to="/">Accueil</router-link> |
    <router-link to="/create-post">Ajouter un article</router-link>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
};
</script>

<style scoped>
nav {
  padding: 10px;
  background-color: #f0f0f0;
}
</style>