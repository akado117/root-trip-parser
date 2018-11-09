const Trip = require('../Trip/index');

class Driver {
  constructor(name) {
    this._name = name;
    this._totalTime = 0;
    this._averageSpeed = 0;
    this._totalDistance = 0;
    this._trips = [];
    this._isSpeedStale = false;
  }

  getName() {
    return this._name;
  }

  getTotalDistance() {
    return this._totalDistance;
  }

  getTotalTime() {
    return this._totalTime;
  }

  addTrip(startTime, endTime, distance) {
    try {
      const trip = new Trip(startTime, endTime, distance);

      const averageSpeed = trip.getAverageSpeed();

      if (averageSpeed < 5 || averageSpeed > 100) return false;

      this._totalTime += trip.getDuration();
      this._totalDistance += trip.getDistance();

      this._trips.push(trip);
      this._isSpeedStale = true;

      return true;
    } catch (e) {
      console.log(e.message);
      return false;
    }
  }

  getAverageSpeed() {
    if (this._isSpeedStale) {
      this._averageSpeed = this._totalDistance / this._totalTime * 60;
      this._isSpeedStale = false;
    }
    return this._averageSpeed;
  }
}

module.exports = Driver;
