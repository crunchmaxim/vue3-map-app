<template>
  <div class="app">
    <MapComponent />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MapComponent from './components/MapComponent.vue'

export default defineComponent({
  name: 'App',
  components: {
    MapComponent,
  },
})
</script>

<style scoped>

</style>
