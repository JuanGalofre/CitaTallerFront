<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header text-center">
            <h4>Registrese con nosotros</h4>
          </div>
          <div class="card-body">
            <form @submit.prevent="registrar">
              <div class="mb-3">
                <label for="nombre" class="form-label">Nombre</label>
                <input
                  type="text"
                  id="nombre"
                  v-model="nombre"
                  class="form-control"
                  required
                  placeholder="Nombre"
                />
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Correo electrónico</label>
                <input
                  type="email"
                  id="email"
                  v-model="email"
                  class="form-control"
                  required
                  placeholder="Correo electrónico"
                />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Contraseña</label>
                <input
                  type="password"
                  id="password"
                  v-model="password"
                  class="form-control"
                  required
                  placeholder="Contraseña"
                />
              </div>
              <div class="mb-3">
                <label for="confirmPassword" class="form-label">Confirmar contraseña</label>
                <input
                  type="password"
                  id="confirmPassword"
                  v-model="confirmPassword"
                  class="form-control"
                  required
                  placeholder="Confirmar contraseña"
                />
              </div>
              <div class="text-center">
                <button type="submit" class="btn btn-primary w-100">Registrarse</button>
              </div>
            </form>
            <div class="mt-3 text-center">
              <p>
                ¿Ya tienes una cuenta? <router-link to="/login">Inicia sesión aquí</router-link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { useToast } from 'vue-toast-notification'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const toast = useToast()
const router = useRouter()
const nombre = ref<string>('')
const email = ref<string>('')
const password = ref<string>('')
const confirmPassword = ref<string>('')

async function registrar() {
  if (password.value !== confirmPassword.value) {
    toast.error('¡Las contraseñas no coinciden, intentalo de nuevo!')
    return
  }
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/register', {
      nombre: nombre.value,
      email: email.value,
      password: password.value,
    })
    const token = response.data.token
    const auth = useAuthStore()
    auth.setToken(token)
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    toast.success('¡Woo, te redigiremos en un instante!')
  } catch (error) {
    console.log(error)
    toast.error('Ups, hubo un error al intentar registrarte.')
  }
  router.push('/dashunificado')
}
</script>

<style scoped>
body {
  background-color: #212121;
  color: #e5e5e5;
  margin: 0;
  padding: 0;
}

.container {
  margin-top: 50px;
}

.card {
  background-color: #2a2a2a;
  color: #e5e5e5;
  border-radius: 10px;
}

.card-header {
  background-color: #333333;
}

.card-body {
  background-color: #2a2a2a;
}

.btn-primary {
  background-color: #4e73df;
  border-color: #4e73df;
}

.btn-primary:hover {
  background-color: #2e59d9;
  border-color: #2653a0;
}

.form-control {
  background-color: #444444;
  color: #e5e5e5;
  border: 1px solid #555555;
}

.form-control:focus {
  border-color: #4e73df;
  box-shadow: 0 0 5px rgba(78, 115, 223, 0.5);
}

.router-link {
  color: #4e73df;
}

.router-link:hover {
  text-decoration: underline;
}
</style>
