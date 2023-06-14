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

var geojson = {
'type': 'FeatureCollection',
'features': [
{
'type': 'Feature',
'properties': {
'message': 'Foo',
'iconSize': [60, 60]
},
'geometry': {
'type': 'Point',
'coordinates': [-66.324462890625, -16.024695711685304]
}
},
{
'type': 'Feature',
'properties': {
'message': 'Bar',
'iconSize': [50, 50]
},
'geometry': {
'type': 'Point',
'coordinates': [-61.2158203125, -15.97189158092897]
}
},
{
'type': 'Feature',
'properties': {
'message': 'Baz',
'iconSize': [40, 40]
},
'geometry': {
'type': 'Point',
'coordinates': [-63.29223632812499, -18.28151823530889]
}
}
]
};

export default {
  name: "MapComponent",
  setup() {
    const mapService = new MapService()
    mapService.getSensorsCoords()

    onMounted(() => {
      const map = new maplibregl.Map({
        container: "map",
        style: "https://gist.githubusercontent.com/smellman/d3cbc19d134d5283df73/raw/a4bb13b44c36e9225f95c545cdedbe7513200d70/osm_mapbox_gl_example.json",
        center: [-74.5, 40],
        zoom: 9 // starting zoom
      })

      geojson.features.forEach(function (marker) {


    // create a DOM element for the marker
    var el = document.createElement('div');
    el.className = 'map-component__marker';
    // el.style.backgroundImage =
    // 'url(https://placekitten.com/g/' +
    // marker.properties.iconSize.join('/') +
    // '/)';
    // el.style.width = marker.properties.iconSize[0] + 'px';
    // el.style.height = marker.properties.iconSize[1] + 'px';

    // el.addEventListener('click', function () {
    // window.alert(marker.properties.message);
    // });

    // add marker to map
    new maplibregl.Marker(el)
    .setLngLat(marker.geometry.coordinates)
    .addTo(map);
    });
    })

    function onSetLayer (layer: string) {
      mapService.getPinballCoords()
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

    &__marker {
      width: 10px;
      height: 10px;
      background-color: red;
      border-radius: 100%;
    }
  }
</style>
