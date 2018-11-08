const Trip = require('./Trip');

describe('Trip Class', () => {
  let trip;
  beforeEach(() => {
    trip = new Trip('12:30', '13:30', 40);
  });
  describe('constructor', () => {
    test('should throw an error if format of args is invalid', () => {
      const errorString = 'Please use valid arguments: \\d\\d:\\d\\d, \\d\\d:\\d\\d, number';
      try {
        new Trip('12:30', '01:30', 'asd');
        // Should not hit this because above should throw error
        expect(5).toEqual(6);
      } catch (e) {
        expect(e.message).toEqual(errorString);
      }
      try {
        new Trip('12:30', '1:30', 1);
        expect(5).toEqual(6);
      } catch (e) {
        expect(e.message).toEqual(errorString);
      }
      try {
        new Trip(32, '01:30', 1);
        expect(5).toEqual(6);
      } catch (e) {
        expect(e.message).toEqual(errorString);
      }
    });
    test('should call parseTime and save start/end time, duration, and distance to trip object', () => {
      const parseTimeHolder = Trip.prototype._parseTime;
      // Modifying prototype can be dangerous. Try catch to make sure prototype is restored before test completed
      try {
        Trip.prototype._parseTime = jest.fn(() => 50);
        
        trip = new Trip('07:30', '08:30', 45);

        expect(trip._duration).toEqual(50);
        expect(trip._startTime).toEqual('07:30');
        expect(trip._endTime).toEqual('08:30');
        expect(trip._distance).toEqual(45);
        expect(trip._parseTime).toHaveBeenLastCalledWith('07:30', '08:30');        
        Trip.prototype._parseTime = parseTimeHolder;
      } catch (e) {
        Trip.prototype._parseTime = parseTimeHolder;
        throw new Error(e);
      }
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
  describe('_parseTime', () => {
    test('should throw error if end time is before start time', () => {
      try {
        trip._parseTime('12:30', '03:30');
        // Should never run because error
        expect(5).toBe(6);
      } catch (e) {
        expect(e.message).toEqual('Please use end times after start times');
      }
    });
    test('should parse start/end time when its a simple hour subtraction', () => {
      trip._parseTime('12:30', '13:30');
      expect(trip._duration).toEqual(60);
    });
    test('should parse start/end time when its hour and minute subtraction', () => {
      trip._parseTime('12:30', '13:15');
      expect(trip._duration).toEqual(45);
    });
  });
});