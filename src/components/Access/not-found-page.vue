<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6 text-center">
        <div class="card">
          <div class="card-body">
            <h1 class="display-1 text-danger">404</h1>
            <h4 class="card-title">Woops, pagina no encontrada</h4>
            <p class="card-text">Verifica la URL</p>
            <router-link to="/" class="btn btn-primary">Volver al inicio</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.container {
  margin-top: 50px;
}
</style>
