const Trip = require('./Trip');

describe('Trip Class', () => {
  let trip;
  beforeEach(() => {
    trip = new Trip('12:30', '01:30', 40);
  });
  describe('constructor', () => {
    test('should throw an error if format of args is invalid', () => {
      const errorString = 'Please use valid arguments: \\d\\d:\\d\\d, \\d\\d:\\d\\d, number';
      try {
        trip.constructor('12:30', '01:30', 'asd');
      } catch (e) {
        expect(e.message).toEqual(errorString);
      }
      try {
        trip.constructor('12:30', '1:30', 1);
      } catch (e) {
        expect(e.message).toEqual(errorString);
      }
      try {
        trip.constructor(32, '01:30', 1);
      } catch (e) {
        expect(e.message).toEqual(errorString);
      }
    });
    test('should call parseTime and save start/end time, duration, and distance to trip object', () => {
      trip.parseTime = jest.fn(() => 50);

      trip.constructor('07:30', '08:30', 45);

      expect(trip._duration).toEqual(50);
      expect(trip._startTime).toEqual('07:30');
      expect(trip._endTime).toEqual('08:30');
      expect(trip._distance).toEqual(45);
      expect(trip.parseTime).toHaveBeenLastCalledWith('07:30', '08:30');
    });
  });
  describe('getDuration', () => {
    test('should return duration within trip', () => {
      const durationString = 'time till the heat death of the universe';
      trip._duration = durationString;
      
      expect(trip.getDuration()).toEqual(durationString);
    });
  });
  describe('getDistance', () => {
    test('should return distance within trip', () => {
      const distance = 299792458;
      trip._distance = distance;
      
      expect(trip.getDistance()).toEqual(distance);
    });
  });
  describe('parseTime', () => {
    test('should throw error if end time is before start time', () => {
      try {
        trip.parseTime('12:30', '3:30');
        // should never run because error
        expect(5).toBe(6);
      } catch (e) {
        expect(e.message).toEqual('Please use end times after start times');
      }
    });
    test('should parse start/end time when its a simple hour subtraction', () => {
      trip.parseTime('12:30', '13:30');
      expect(trip._duration).toEqual(60);
    });
    test('should parse start/end time when its hour and minute subtraction', () => {
      trip.parseTime('12:30', '13:15');
      expect(trip._duration).toEqual(45);
    });
  });
});