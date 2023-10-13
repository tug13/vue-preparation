import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/PageNotFound',
    name: 'erreur404',
    component: () => import(/* webpackChunkName: "about" */ '../views/PageNotFound.vue')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/dashboard/DashboardView.vue')
  },{
    path: '/produits',
    name: 'produits',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/produits/ProduitsView.vue')
  },
  {
    path: '/matrice',
    name: 'matrice',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/matrice/MatriceView.vue')
  },
  {
    path: '/',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) =>{ 
  const loggedIn = localStorage.getItem('currentToken');
  if (loggedIn || to.name === 'login') {
    // Continue to page.
    next()
  } else {
    // Not logged in, redirect to login.
    next({name: 'login'})
  }
})

export default router
