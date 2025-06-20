import LoginPage from '@/components/Access/login-page.vue'
import NotFoundPage from '@/components/Access/not-found-page.vue'
import RegisterPage from '@/components/Access/register-page.vue'
import DashboardUnificado from '@/components/Dashboards/dashboard-unificado.vue'
import createCita from '@/components/Cita/create-cita.vue'
import { createRouter, createWebHistory } from 'vue-router'
import EditCita from '@/components/Cita/edit-cita.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: LoginPage },
    { path: '/register', component: RegisterPage },
    { path: '/dashunificado', component: DashboardUnificado },
    { path: '/crearcita', component: createCita },
    { path: '/cita/editar/:id', component: EditCita },
    { path: '/:catchAll(.*)', component: NotFoundPage },
  ],
})

export default router
