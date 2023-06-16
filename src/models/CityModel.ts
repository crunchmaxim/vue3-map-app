export default class CityModel {
  name: string = ''
  coords: Array<number> = []

  constructor (name: string, coords: Array<number>) {
    this.name = name
    this.coords = coords
  }
}