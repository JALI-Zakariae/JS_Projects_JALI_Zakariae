<template>
  <div class="post">
    <h2>{{ post.title }}</h2>
    <p>{{ snippet }}</p>
    <p><strong>Tags :</strong> {{ post.tags.join(", ") }}</p>
    <router-link :to="`/post/${post.id}`">Lire la suite</router-link>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  computed: {
    snippet() {
      return this.post.body.substring(0, 50) + "...";
    },
  },
};
</script>

<style scoped>
.post {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
}
</style>