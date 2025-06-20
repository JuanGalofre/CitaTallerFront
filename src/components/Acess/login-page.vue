<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header text-center">
            <h4>Taller de vehículos</h4>
          </div>
          <div class="card-body">
            <form @submit.prevent="login">
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
              <div class="text-center">
                <button type="submit" class="btn btn-primary w-100">Iniciar sesión</button>
              </div>
              <div class="mt-3 text-center">
                <p>
                  ¿No tienes una cuenta? <router-link to="/register">Registrate aqui</router-link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toast-notification'
import { useAuthStore } from '../stores/auth'

const email = ref<string>('')
const password = ref<string>('')
const router = useRouter()
const toast = useToast()

async function login() {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/login', {
      email: email.value,
      password: password.value,
    })

    const token = response.data.token

    const auth = useAuthStore()
    //Se recarga el rol
    auth.setToken(token)

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

    router.push('/dashunificado')
  } catch (error) {
    console.log(error)
    toast.error('Ups, hubo un error al intentar iniciar sesión, intenta de nuevo más tarde')
  }
}
</script>

<style scoped>
body {
  background-color: #1c1c1c;
  color: #e5e5e5;
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
  color: #e5e5e5;
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
