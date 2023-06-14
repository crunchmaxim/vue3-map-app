export type GeoJsonGeometry = {
  type: string,
  coordinates: Array<number>
}

export type GeoJsonProperties = {
  name: string
}

export type GeoJsonConstructorData = {
  coordinates: Array<number>,
  name: string
}

export default class GeoJsonModel {
  type = 'Feature'
  geometry: GeoJsonGeometry = {
    type: 'Point',
    coordinates: [0, 0]
  }
  properties: GeoJsonProperties = {
    name: ''
  }

  constructor ({ coordinates, name }: GeoJsonConstructorData) {
    this.geometry.coordinates = coordinates
    this.properties.name = name
  }
}