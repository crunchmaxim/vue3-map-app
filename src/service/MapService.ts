import GeoJsonModel from '@/models/GeoJsonModel'
import type { GeoJsonConstructorData } from '@/models/GeoJsonModel'
import MapApiGateway from '../api/MapApiGateway'
import { useMapStore } from '@/stores/MapStore'

export default class MapService {
  api
  store

  constructor () {
    this.api = new MapApiGateway()
    this.store = useMapStore()
  }

  async getPinballCoords () {
    const res = await this.api.getPinballCoords()
    const geoJsonArr = this.convertPinballToGeoJson(res.locations)
    this.store.setPinballGeoJsons(geoJsonArr)
    return geoJsonArr
  }

  convertPinballToGeoJson (collection: Array<any>) {
    const result = collection.map(i => {
      const data: GeoJsonConstructorData = {
        coordinates: [i.lat, i.lon],
        name: i.name
      }
      return new GeoJsonModel(data)
    })
    return result
  }

  async getSensorsCoords () {
    const res = await this.api.getSensorsCoords()
    const geoJsonArr = this.convertSensorsToGeoJson(res)
    this.store.setSensorsGeoJsons(geoJsonArr)
    return geoJsonArr
  }

  convertSensorsToGeoJson (collection: Array<any>) {
    const result = collection.map(i => {

      const data: GeoJsonConstructorData = {
        coordinates: i.currentLocation.coordinates.slice(0, 2),
        name: `${i.name}: ${i.sensors.length}`
      }

      return new GeoJsonModel(data)
    })
    return result
  }
}