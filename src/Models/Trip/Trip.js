// stored here because there's no reason to recreate string ever time parseTime is called
const partialDateString = 'December 25, 1995 ';
const timeRegExp = new RegExp('^\\d\\d:\\d\\d$');

class Trip {
  constructor(start, end, distance) {
    // does not store start/end as date objects as unneeded waste of memory
    if (!timeRegExp.test(start) || !timeRegExp.test(end) || isNaN(distance)) {
      throw new Error('Please use valid arguments: \\d\\d:\\d\\d, \\d\\d:\\d\\d, number');
    }

    this._duration = this._parseTime(start, end);
    this._startTime = start;
    this._endTime = end;
    this._distance = parseFloat(distance);
  }

  _parseTime(start, end) {
    const startTime = new Date(partialDateString + start);
    const endTime = new Date(partialDateString + end);
    
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
    if (typeof this._averageSpeed === 'undefined') {
      this._averageSpeed = this._distance / (this._duration / 60);
    }

    return this._averageSpeed;
  }
}

module.exports = Trip;
