<template>
  <div class="map-component">
    <MapControls @setLayer="onSetLayer" />
    <div id="map" class="map-component__map"></div>
  </div>
</template>

<script lang="ts">
import maplibregl from 'maplibre-gl'
import { shallowRef, onMounted, onUnmounted, markRaw } from 'vue';
import MapControls from './MapControls.vue';
import MapService from '../service/MapService'

export default {
  name: "MapComponent",
  setup() {
    const mapService = new MapService()
    mapService.getPinballMachinesCoords()

    onMounted(() => {
      const map = new maplibregl.Map({
        container: "map",
        style: "https://gist.githubusercontent.com/smellman/d3cbc19d134d5283df73/raw/a4bb13b44c36e9225f95c545cdedbe7513200d70/osm_mapbox_gl_example.json",
        center: [-74.5, 40],
        zoom: 9 // starting zoom
      })
    })

    function onSetLayer (layer: string) {
      mapService.getPinballMachinesCoords()
    }

    return { onSetLayer }
  },
  components: {
    MapControls
  }
}
</script>

<style lang="scss">
  .map-component {
    &__map {
      min-width: 100vw;
      min-height: 100vh;
      width: 100%;
      height: 100%;
    }
  }
</style>
