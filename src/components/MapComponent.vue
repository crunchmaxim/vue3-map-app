<template>
  <div class="map-component">
    <div :class="['map-component__loading', loading ? 'active' : '']">
      <div class="lds-dual-ring"></div>
    </div>
    <MapControls @setLayer="onSetLayer" @setCity="onSetCity" />
    <div id="map" class="map-component__map"></div>
  </div>
</template>

<script lang="ts">
import maplibregl, { type LngLatLike, Map } from 'maplibre-gl'
import { defineComponent, onMounted, ref } from 'vue';
import MapControls from './MapControls.vue';
import MapService from '../service/MapService'
import { LayerTypesEnum } from '@/types/common';
import type CityModel from '@/models/CityModel';
import type GeoJsonModel from '@/models/GeoJsonModel';

export default defineComponent({
  name: "MapComponent",
  setup() {
    const mapService = new MapService()

    let loading = ref(false)

    // Объект карты
    let mapObj: Map

    // Инициализация карты и установка экземпляра карты в mapObj
    function initMap() {
      const map = new maplibregl.Map({
        container: "map",
        style: "https://gist.githubusercontent.com/smellman/d3cbc19d134d5283df73/raw/a4bb13b44c36e9225f95c545cdedbe7513200d70/osm_mapbox_gl_example.json",
        center: [-74.5, 40],
        zoom: 9
      })

      mapObj = map
    }

    onMounted(() => {
      initMap()
    })

    // Функция изменения слоя карты
    async function onSetLayer(layer: LayerTypesEnum) {
      loading.value = true

      // Очистка карты в случае, если уже выбран какой-то слой
      clearMap()

      // Загрузка соответствующих слою координат через сервис и их последующая установка через функцию setMarkers
      switch (layer) {
        case LayerTypesEnum.Pinball:
          setMarkers(await mapService.getPinballCoords())
          break;
        case LayerTypesEnum.Sensors:
          setMarkers(await mapService.getSensorsCoords())
          break;
        default:
          break;
      }
      loading.value = false
    }

    // Удаление текущего слоя с карты
    function clearMap () {
      const currentLayer = mapObj.getLayer('markers')
      const currentSource = mapObj.getSource('markers')

      if (currentLayer) {
        mapObj.removeLayer(currentLayer.id)
      }

      if (currentSource) {
        mapObj.removeSource(currentSource.id)
      }
    }

    // Добавление нового слоя с маркерами для карты
    function setMarkers (geoJsons: Array<GeoJsonModel>) {
      const map = mapObj
      map.loadImage(
        'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
        function (error, image) {
          if (error) throw error;

          if (!map.hasImage('custom-marker')) {
            map.addImage('custom-marker', image);
          }

          // Add a GeoJSON source
          map.addSource('markers', {
            'type': 'geojson',
            'data': {
              'type': 'FeatureCollection',
              'features': geoJsons
            }
          })
          // Add a symbol layer
          map.addLayer({
            'id': 'markers',
            'type': 'symbol',
            'source': 'markers',
            'layout': {
              'icon-image': 'custom-marker',
              'text-field': ['get', 'name'],
              'text-offset': [0, 1.25],
              'text-anchor': 'top'
            }
          })
        }
      )
    }

    // Переход к выбранному городу
    function onSetCity(city: CityModel) {
      mapObj.jumpTo({ center: city.coords as LngLatLike });
      mapObj.zoomTo(10, { duration: 2000 });
    }

    return { onSetLayer, onSetCity, loading }
  },
  components: {
    MapControls
  }
})
</script>

<style lang="scss">
.map-component {
  &__map {
    min-width: 100vw;
    min-height: 100vh;
    width: 100%;
    height: 100%;
  }

  &__loading {
    width: 100vw;
    height: 100vh;
    position: absolute;
    left: 0;
    top: 0;
    background: rgba(0,0,0,0.5);
    display: none;
    z-index: 999;

    &.active {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}

// Loader styles
.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #fff;
  border-color: #fff transparent #fff transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

</style>
