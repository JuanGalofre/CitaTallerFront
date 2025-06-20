// api/citasService.ts
import axios from 'axios'
import type { Cita, CitaParcial } from '@/components/types/citasTypes'

const BASE_URL = 'http://127.0.0.1:8000/api/citas'

export async function obtenerCitas(): Promise<Cita[]> {
  const response = await axios.get(BASE_URL)
  return response.data
}

export async function crearCita(citaParcial: CitaParcial) {
  await axios.post(BASE_URL, { ...citaParcial })
}

export async function actualizarEstadoCita(cita: Cita, estado: string): Promise<void> {
  await axios.put(`${BASE_URL}/${cita.id}`, { ...cita, estado })
}

export async function eliminarCita(id: number): Promise<void> {
  await axios.delete(`${BASE_URL}/${id}`)
}

export async function actualizarCita(id: string, cita: CitaParcial): Promise<void> {
  await axios.put(`${BASE_URL}/${id}`, { ...cita })
}

//Es necesario el casteo ?
export async function obtenerCita(id: string): Promise<Cita> {
  const response = await axios.get(`${BASE_URL}/${id}`)
  return response.data
}
