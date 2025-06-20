<template>
  <div class="container">
    <div v-if="cargando" class="text-center my-4">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Cargando...</span>
      </div>
    </div>
    <div v-else class="card">
      <div class="card-header text-center">
        <h4 v-if="admin">Lista de citas</h4>
        <h4 v-else>Citas programadas</h4>
        <button class="btn-add-cita" @click="agregarCita">Añadir cita</button>
      </div>
      <div class="card-body">
        <table class="table table-dark">
          <thead>
            <tr>
              <th>#</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Descripción</th>
              <th>Estado</th>
              <th v-if="admin">Editar Cita</th>
              <th v-if="admin">Eliminar Cita</th>
              <th v-if="!admin">Cancelar Cita</th>
              <th v-if="!admin">Confirmar Cita</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="citas.length === 0">
              <td colspan="8" class="text-center">Sin registros</td>
            </tr>
            <tr v-for="(cita, index) in citasPaginadas" :key="cita.id">
              <td>{{ index + 1 }}</td>
              <td>{{ cita.fecha }}</td>
              <td>{{ cita.hora }}</td>
              <td>{{ cita.descripcion }}</td>
              <td>{{ cita.estado }}</td>
              <td v-if="admin">
                <router-link :to="`/cita/editar/${cita.id}`" class="btn-edit-cita">
                  <i class="fas fa-edit"></i>
                </router-link>
              </td>
              <td v-if="admin">
                <button class="btn-delete-cita" @click="eliminarCitaConConfirmacion(cita.id)">
                  <i class="fas fa-trash-alt"></i>
                </button>
              </td>
              <td v-if="!admin">
                <button
                  class="btn-cancelar-cita"
                  @click="cambiarEstado(cita, 'cancelada')"
                  :disabled="cita.estado === 'Cancelada'"
                >
                  <i class="fas fa-ban"></i>
                </button>
              </td>
              <td v-if="!admin">
                <button
                  class="btn-confirmar-cita"
                  @click="cambiarEstado(cita, 'confirmada')"
                  :disabled="cita.estado === 'Confirmada'"
                >
                  <i class="fas fa-check-circle"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="pagination">
          <button @click="cambiarPagina(pagina - 1)" :disabled="pagina === 1">Anterior</button>
          <span>Página {{ pagina }} de {{ paginasTotales }}</span>
          <button @click="cambiarPagina(pagina + 1)" :disabled="pagina === paginasTotales">
            Siguiente
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Cita } from '../types/citasTypes'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toast-notification'
import { useAuthStore } from '../stores/auth'
import { obtenerCitas } from '@/functions/citasService'
import { actualizarEstadoCita, eliminarCita } from '@/functions/citasService'
import { onMounted } from 'vue'

const toast = useToast()
const router = useRouter()
const citas = ref<Cita[]>([])
const auth = useAuthStore()
const admin = auth.isAdmin
const cargando = ref(false)
const pagina = ref(1)
const itemsPorPagina = 10

const paginasTotales = computed(() => {
  return Math.ceil(citas.value.length / itemsPorPagina)
})
const citasPaginadas = computed(() => {
  const start = (pagina.value - 1) * itemsPorPagina
  return citas.value.slice(start, start + itemsPorPagina)
})
// Función para cambiar de página
const cambiarPagina = (nuevaPagina: number) => {
  if (nuevaPagina >= 1 && nuevaPagina <= paginasTotales.value) {
    pagina.value = nuevaPagina
  }
}

function mostrarError(mensaje = 'Ups, ocurrió un error') {
  toast.error(mensaje)
  console.error(mensaje)
}

async function cargarCitas() {
  cargando.value = true
  try {
    citas.value = await obtenerCitas()
  } catch (error) {
    console.log(error)
    mostrarError('Hubo un error obteniendo las citas')
  } finally {
    cargando.value = false
  }
}

function agregarCita() {
  router.push('/crearcita')
}

async function cambiarEstado(cita: Cita, nuevoEstado: 'confirmada' | 'cancelada') {
  const mensaje =
    nuevoEstado === 'confirmada'
      ? '¿Estás seguro de que deseas confirmar esta cita?'
      : '¿Estás seguro de que deseas cancelar esta cita?'

  if (!window.confirm(mensaje)) return

  try {
    //
    await actualizarEstadoCita(cita, nuevoEstado)
    toast.success(`Cita ${nuevoEstado}`)
    await cargarCitas()
  } catch {
    mostrarError(`Error al ${nuevoEstado === 'confirmada' ? 'confirmar' : 'cancelar'} la cita`)
  }
}

async function eliminarCitaConConfirmacion(id: number) {
  if (!window.confirm('¿Estás seguro de que deseas eliminar esta cita?')) return

  try {
    await eliminarCita(id)
    toast.success('Cita eliminada')
    await cargarCitas()
  } catch {
    mostrarError('Error al eliminar la cita')
  }
}

onMounted(() => {
  cargarCitas()
})
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

.table {
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
}

.table th,
.table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #555555;
}

.table th {
  background-color: #333333;
  color: #e5e5e5;
}

.table td {
  background-color: #444444;
}

.table tr:hover {
  background-color: #555555;
}
</style>
