const Driver = require('../Models/Driver');

class DriverController {
  constructor() {
    this._drivers = {};
  }

  parseCommand(command) {
    const splitCommand = command.split(' ');

    if (splitCommand[0] === 'Driver') {
      this._addDriver(splitCommand[1]);
    }

    if (splitCommand[0] === 'Trip') {
      const [cmd, name, start, end, distance] = splitCommand;
      this._addTripToDriver(name, start, end, distance);
    }
  }

  _addDriver(name) {
    if (this._drivers[name]) return false;
    this._drivers[name] = new Driver(name);
    return true;
  }

  _addTripToDriver(name, start, end, distance) {
    const driver = this._drivers[name];
    
    if (!driver) return false;

    return driver.addTrip(start, end, distance);
  }

  getDrivers() {
    return Object.values(this._drivers);
  }
}

module.exports = DriverController;
