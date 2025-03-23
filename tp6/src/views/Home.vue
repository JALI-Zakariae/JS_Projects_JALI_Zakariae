<template>
  <div>
    <NavBar />
    <div class="container">
      <PostList />
      <TagCloud />
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import PostList from "../components/PostList.vue";
import TagCloud from "../components/TagCloud.vue";

export default {
  components: {
    NavBar,
    PostList,
    TagCloud,
  },
};
</script>

<style scoped>
.container {
  display: flex;
}
</style>