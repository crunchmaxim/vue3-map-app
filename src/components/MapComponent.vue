<template>
  <div class="map-component">
    <MapControls @setLayer="onSetLayer" @setCity="onSetCity" />
    <div id="map" class="map-component__map"></div>
  </div>
</template>

<script lang="ts">
import maplibregl, { type LngLatLike, Map } from 'maplibre-gl'
import { onMounted, ref } from 'vue';
import MapControls from './MapControls.vue';
import MapService from '../service/MapService'
import { LayerTypesEnum } from '@/types/common';
import type CityModel from '@/models/CityModel';
import type GeoJsonModel from '@/models/GeoJsonModel';

export default {
  name: "MapComponent",
  setup() {
    const mapService = new MapService()
    let mapObj = ref<Map>()

    // Инициализация карты
    function initMap() {
      const map = new maplibregl.Map({
        container: "map",
        style: "https://gist.githubusercontent.com/smellman/d3cbc19d134d5283df73/raw/a4bb13b44c36e9225f95c545cdedbe7513200d70/osm_mapbox_gl_example.json",
        center: [-74.5, 40],
        zoom: 9
      })

      mapObj.value = map
    }

    onMounted(() => {
      initMap()
    })

    // Функция изменения слоя карты
    async function onSetLayer(layer: LayerTypesEnum) {

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
    }

    // Удаление текущего слоя с карты
    function clearMap () {
      const currentLayer = mapObj.value?.getLayer('markers')
      const currentSource = mapObj.value?.getSource('markers')

      if (currentLayer) {
        mapObj.value?.removeLayer(currentLayer.id)
      }

      if (currentSource) {
        mapObj.value?.removeSource(currentSource.id)
      }
    }

    // Добавление нового слоя с маркерами для карты
    function setMarkers (geoJsons: Array<GeoJsonModel>) {
      const map = mapObj.value!
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
      mapObj.value!.jumpTo({ center: city.coords as LngLatLike });
      mapObj.value!.zoomTo(10, { duration: 2000 });
    }

    return { onSetLayer, onSetCity, mapObj }
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

  &__marker {
    width: 10px;
    height: 10px;
    background-color: red;
    border-radius: 100%;
  }
}
</style>
