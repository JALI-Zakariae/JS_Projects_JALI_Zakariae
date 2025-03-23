import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue";
import CreatePostView from "./views/CreatePostView.vue";
import PostDetailView from "./views/PostDetailView.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/create-post", component: CreatePostView },
  { path: "/post/:id", component: PostDetailView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
