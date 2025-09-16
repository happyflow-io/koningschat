import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './pages/HomePage.vue'
import InschrijvenPage from './pages/InschrijvenPage.vue'
import ActiviteitenPage from './pages/ActiviteitenPage.vue'
import ContactPage from './pages/ContactPage.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/inschrijven', component: InschrijvenPage },
  { path: '/activiteiten', component: ActiviteitenPage },
  { path: '/contact', component: ContactPage },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
