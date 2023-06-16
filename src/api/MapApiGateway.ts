// Транспортный слой для получения данных для карты
export default class MapApiGateway {

  async getPinballCoords () {
    try {
      const res = await fetch('https://pinballmap.com/api/v1/locations.json?region=Portland')
      return await res.json()
    } catch (error) {
      console.error(error)
    }
  }

  async getSensorsCoords () {
    try {
      const res = await fetch('https://api.opensensemap.org/boxes?near=13.424900,52.507076&maxDistance=200000')
      return await res.json()
    } catch (error) {
      console.error(error)
    }
  }
}