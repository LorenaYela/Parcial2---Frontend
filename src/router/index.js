import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import login from '@/views/login.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta:{
      requireAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: login
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach ((to, from, next) => {
  if(to.matched.some(record =>record.meta.requireAuth)){
  //la ruta requiere autenticacion
    const token = localStorage.getItem("token");

    if(!token){
      next('/login')
    }

  }
  next();
  
});

export default router;
