import { createRouter, createWebHistory } from 'vue-router';
import ExperimentsList from '../pages/ExperimentsList.vue';
import ExperimentForm from '../pages/ExperimentForm.vue';
import Login from '../pages/Login.vue';
import Register from '../pages/Register.vue';

const routes = [
  { path: '/', name: 'home', component: ExperimentsList },
  { path: '/experiments/new', name: 'experiment.new', component: ExperimentForm }
  ,{ path: '/login', name: 'login', component: Login }
  ,{ path: '/register', name: 'register', component: Register }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
