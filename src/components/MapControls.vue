<template>
  <div class="map-controls">

    <div class="map-controls__wrapper">
      <button
        :class="['map-controls__btn', currentLayer === layerTypesEnum.Pinball ? 'active' : '']"
        @click="setLayer(layerTypesEnum.Pinball)"
      >
        Pinball machines
      </button>

      <button
      :class="['map-controls__btn', currentLayer === layerTypesEnum.Sensors ? 'active' : '']"
        @click="setLayer(layerTypesEnum.Sensors)"
      >
        Sensors
      </button>
    </div>

    <div class="map-controls__wrapper">
      <button
        v-for="city in cities"
        :key="city.name"
        class="map-controls__btn"
        @click="setCity(city)"
      >
        {{ `To ${city.name}` }}
      </button>
    </div>

  </div>
</template>

<script lang="ts">
import CityModel from '@/models/CityModel'
import { LayerTypesEnum } from '@/types/common'
import { ref } from 'vue'

export default {
  name: 'MapControls',
  setup (_props, { emit }) {
    const layerTypesEnum = LayerTypesEnum
    const currentLayer = ref<LayerTypesEnum | null>(null)

    const cities = [
      new CityModel('Berlin', [13.41053, 52.52437]),
      new CityModel('Portland', [-122.674195, 45.520247]),
    ]

    function setLayer (layer: LayerTypesEnum) {
      currentLayer.value = layer
      emit('setLayer', layer)
    }

    function setCity (city: CityModel) {
      emit('setCity', city)
    }

    return { setLayer, setCity, layerTypesEnum, cities, currentLayer }
  }
}

</script>

<style lang="scss">
  .map-controls {
    position: absolute;
    left: 20px;
    top: 20px;
    z-index: 100;
    display: flex;
    gap: 30px;
    flex-direction: column;

    &__wrapper {
      display: flex;
      flex-direction: column;
      gap: 10px;
      background-color: #fff;
      padding: 10px;
      border-radius: 20px;
    }

    &__btn {
      border: none;
      background-color: #FAF0E4;
      padding: 10px;
      border-radius: 20px;
      cursor: pointer;
      font-weight: 600;

      &:hover {
        background-color: #FFDEDE;
      }

      &.active {
        background-color: #4264fb;
        color: #fff;
      }
    }
  }
</style>