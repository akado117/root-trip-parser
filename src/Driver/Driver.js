const Trip = require('../Trip');

class Driver {
  constructor(name) {
    this._name = name;
    this._totalTime = 0;
    this._averageSpeed = 0;
    this._totalDistance = 0;
    this._trips = [];
  }

  getTotalDistance() {
    return this._totalDistance;
  }

  getTotalTime() {
    return this._totalTime;
  }

  getAverageSpeed() {
    return this._averageSpeed;
  }

  addTrip(startTime, endTime, distance) {
    try {
      const trip = new Trip(startTime, endTime, distance);

      this._totalTime += trip.getDuration();
      this._totalDistance += trip.getDistance();

      this._trips.push(trip);
      return true;
    } catch (e) {
      return false;
    }
  }

  calculateAverageSpeed() {
    this._averageSpeed = this._totalDistance / this._totalTime * 60;
  }
}

module.exports = Driver;
