import { createRouter, createWebHistory } from 'vue-router';
import Library from '../views/Library1.vue';
import BookDetails from '../components/BookDetails.vue';

const routes = [
  {
    path: '/',
    name: 'Library',
    component: Library
  },
  {
    path: '/book/:id',  
    name: 'BookDetails',
    component: BookDetails,
    props: true  
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;








