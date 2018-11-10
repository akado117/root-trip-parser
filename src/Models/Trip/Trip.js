// stored here because there's no reason to recreate string ever time parseTime is called
const partialDateString = 'December 25, 1995 ';
const timeRegExp = new RegExp('^\\d\\d:\\d\\d$');

class Trip {
  constructor(start, end, distance) {
    // does not store start/end as date objects as unneeded waste of memory
    if (!timeRegExp.test(start) || !timeRegExp.test(end) || isNaN(distance)) {
      throw new Error('Please use valid arguments: \\d\\d:\\d\\d, \\d\\d:\\d\\d, number');
    }

    this._duration = this._calculateDuration(start, end);
    this._startTime = start;
    this._endTime = end;
    this._distance = parseFloat(distance);
    // mile / minutes * hours/minute
    this._averageSpeed = this._distance / this._duration * 60 || 0;
  }

  _calculateDuration(start, end) {
    const startTime = Date.parse(partialDateString + start);
    const endTime = Date.parse(partialDateString + end);
    
    const msOfDuration = endTime - startTime;
    
    if (msOfDuration < 0) throw new Error('Please use end times after start times');

    // ms to minutes
    return msOfDuration / 60000;
  }
  
  getDuration() {
    return this._duration;
  }

  getDistance() {
    return this._distance;
  }

  getAverageSpeed() {
    return this._averageSpeed;
  }
}

module.exports = Trip;
