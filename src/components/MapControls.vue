<template>
  <div class="map-controls">

    <button
      :class="['map-controls__btn', currentLayer === layerTypes.PinballMachines ? 'active' : '']"
      @click="setLayer(layerTypes.PinballMachines)"
    >
      Pinball machines
    </button>

    <button
    :class="['map-controls__btn', currentLayer === layerTypes.Sensors ? 'active' : '']"
      @click="setLayer(layerTypes.Sensors)"
    >
      Sensors
    </button>

  </div>
</template>

<script lang="ts">
import { ref } from 'vue'

enum LayerTypes {
  PinballMachines = 'pinballMachines',
  Sensors = 'sensors',
}

export default {
  name: 'MapControls',
  setup (_props, { emit }) {
    const layerTypes = LayerTypes

    const currentLayer = ref(LayerTypes.PinballMachines)

    function setLayer (layer: LayerTypes) {
      currentLayer.value = layer
      emit('setLayer', layer)
    }

    return { setLayer, layerTypes, currentLayer }
  }
}

</script>

<style lang="scss">
  .map-controls {
    position: absolute;
    left: 20px;
    top: 20px;
    padding: 10px;
    background-color: #fff;
    z-index: 100;
    display: flex;
    flex-direction: column;
    gap: 10px;

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
        background-color: #FF8551;
      }
    }
  }
</style>