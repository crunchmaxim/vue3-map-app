import type GeoJsonModel from '@/models/GeoJsonModel'
import { defineStore } from 'pinia'

export const useMapStore = defineStore('MapStore', {
  state: () => ({
    geoJsons: [] as Array<GeoJsonModel>,
  }),
  getters: {
    getGeoJsons: (state) => state.geoJsons.slice(),
  },
  actions: {
    setGeoJsons (value: Array<GeoJsonModel>) {
      this.geoJsons = value
    },
  },
})