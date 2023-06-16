import GeoJsonModel from '@/models/GeoJsonModel'
import type { GeoJsonConstructorData } from '@/models/GeoJsonModel'
import MapApiGateway from '../api/MapApiGateway'

// Сервис для работы с картой. Обычно сервис содержит в себе основную бизнес-логику.
// В данном случае сервис отвечает за получение данных посредством транспортного слоя (MapApiGateway) и их преобразование.
export default class MapService {
  api

  constructor () {
    this.api = new MapApiGateway()
  }

  async getPinballCoords () {
    const res = await this.api.getPinballCoords()
    const geoJsonArr = this.convertPinballToGeoJson(res.locations)
    return geoJsonArr
  }

  convertPinballToGeoJson (collection: Array<any>) {
    const result = collection.map(i => {
      const data: GeoJsonConstructorData = {
        coordinates: [i.lon, i.lat],
        name: i.name
      }
      return new GeoJsonModel(data)
    })
    return result
  }

  async getSensorsCoords () {
    const res = await this.api.getSensorsCoords()
    const geoJsonArr = this.convertSensorsToGeoJson(res)
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