import MapApiGateway from '../api/MapApiGateway'

export default class MapService {
  api: MapApiGateway

  constructor () {
    this.api = new MapApiGateway()
  }

  async getPinballMachinesCoords () {
    return await this.api.getPinballMachinesCoords()
  }

  async getSensersCoords () {
    return await this.api.getPinballMachinesCoords()
  }
}