const partialDateString = 'December 25, 1995 ';

class Trip {
  constructor() {
    // does not store start/end as date objects as unneeded waste of memory
  }
  
  getDuration() {}

  getDistance() {}

  parseTime(start, end) {
    const startTime = new Date(partialDateString + start);
    const endTime = new Date(partialDateString + end);

    const msOfDuration = endTime - startTime;
    
    if (msOfDuration < 0) throw new Error('Please use end times after start times');

    // ms to minutes
    this._duration = msOfDuration / 60000;
  }
}

module.exports = Trip;
