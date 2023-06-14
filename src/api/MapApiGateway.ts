export default class MapApiGateway {

  async getPinballMachinesCoords () {
    const res = await fetch('https://pinballmap.com/api/v1/locations.json?region=Portland')
    return await res.json()
  }

  async getSensersCoords () {
    const res = await fetch('https://api.opensensemap.org/boxes?near=13.424900,52.507076&maxDistance=200000')
    return await res.json()
  }
}