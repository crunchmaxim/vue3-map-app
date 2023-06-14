import type GeoJsonModel from '@/models/GeoJsonModel'
import { defineStore } from 'pinia'

export const useMapStore = defineStore('MapStore', {
  state: () => ({
    pinballGeoJsons: [] as Array<GeoJsonModel>,
    sensorsGeoJsons: [] as Array<GeoJsonModel>,
  }),
  getters: {
    getPinballGeoJsons: (state) => state.pinballGeoJsons.slice(),
    getSensorsGeoJsons: (state) => state.sensorsGeoJsons.slice(),
  },
  actions: {
    setPinballGeoJsons (value: Array<GeoJsonModel>) {
      this.pinballGeoJsons = value
    },
    setSensorsGeoJsons (value: Array<GeoJsonModel>) {
      this.sensorsGeoJsons = value
    },
  },
})