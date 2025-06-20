export interface Cita {
  id: number
  user_id: number
  fecha: string
  hora: string
  descripcion: string
  estado: string
  created_at: string
  updated_at: string
}
export interface CitaParcial {
  fecha: string
  hora: string
  descripcion: string
}
