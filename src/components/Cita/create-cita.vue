<template>
  <div class="container">
    <div class="card">
      <div class="card-header text-center">
        <h4>Crear Cita</h4>
      </div>
      <div class="card-body">
        <form @submit.prevent="generarCita">
          <div class="mb-3">
            <label for="fecha" class="form-label">Fecha</label>
            <input type="date" id="fecha" v-model="cita.fecha" class="form-control" required />
          </div>
          <div class="mb-3">
            <label for="hora" class="form-label">Hora</label>
            <input type="time" id="hora" v-model="cita.hora" class="form-control" required />
          </div>
          <div class="mb-3">
            <label for="descripcion" class="form-label">Descripción</label>
            <textarea
              id="descripcion"
              v-model="cita.descripcion"
              class="form-control"
              rows="4"
              required
            ></textarea>
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-primary w-100">Crear Cita</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useToast } from 'vue-toast-notification'
import { useRouter } from 'vue-router'
import type { CitaParcial } from '../types/citasTypes'
import { crearCita } from '@/functions/citasService'

const router = useRouter()
const toast = useToast()

const cita = reactive<CitaParcial>({
  fecha: '',
  hora: '',
  descripcion: '',
})

async function generarCita() {
  try {
    await crearCita(cita)
    toast.success('Cita registrada')
    router.push('/dashunificado')
  } catch (error) {
    console.log(error)
    if (error.response?.status === 422) {
      const mensaje = Object.values(error.response.data.details).flat().join('\n')
      toast.error(mensaje)
    } else {
      console.log(error)
      toast.error('Ups, hubo un error al intentar registrarte.')
    }
  }
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
  color: #e5e5e5;
}

.card-body {
  background-color: #2a2a2a;
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

.btn-primary {
  background-color: #4e73df;
  border-color: #4e73df;
}

.btn-primary:hover {
  background-color: #2e59d9;
  border-color: #2653a0;
}
</style>
