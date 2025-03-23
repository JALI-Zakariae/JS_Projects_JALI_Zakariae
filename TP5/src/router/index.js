import { createRouter, createWebHistory } from "vue-router";
import Home from "./components/Home.vue";
import JobDetails from "./components/JobDetails.vue";
import JobForm from "./components/JobForm.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/job/:id", component: JobDetails },
  { path: "/add-job", component: JobForm },
  { path: "/edit-job/:id", component: JobForm },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;