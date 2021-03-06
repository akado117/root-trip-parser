const Trip = require('./Trip');
const { stubPrototype } = require('../../helpers/testHelpers');

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
    test('should call calculateDuration and save start/end time, duration, averageSpeed, and distance to trip object', () => {
      // Modifying prototype can be dangerous. Try catch to make sure prototype is restored before test completed
      const restoreFunc = stubPrototype(Trip, '_calculateDuration', () => 50);
      try {
        trip = new Trip('07:30', '08:30', 45);

        expect(trip._duration).toEqual(50);
        expect(trip._startTime).toEqual('07:30');
        expect(trip._endTime).toEqual('08:30');
        expect(trip._distance).toEqual(45);
        expect(trip._calculateDuration).toHaveBeenLastCalledWith('07:30', '08:30');
        expect(trip._averageSpeed).toEqual(45 / 50 * 60);
        restoreFunc();
      } catch (e) {
        restoreFunc();
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
  describe('_calculateDuration', () => {
    test('should throw error if end time is before start time', () => {
      try {
        trip._calculateDuration('12:30', '03:30');
        // Should never run because error
        expect(5).toBe(6);
      } catch (e) {
        expect(e.message).toEqual('Please use end times after start times');
      }
    });
    test('should parse start/end time when its a simple hour subtraction', () => {
      const duration = trip._calculateDuration('12:30', '13:30');
      expect(duration).toEqual(60);
    });
    test('should parse start/end time when its hour and minute subtraction', () => {
      const duration = trip._calculateDuration('12:30', '13:15');
      expect(duration).toEqual(45);
    });
  });
  describe('getAverageSpeed', () => {
    test('should calulate and return/store average speed', () => {
      trip._averageSpeed = 'speed racer';

      expect(trip.getAverageSpeed()).toEqual('speed racer');
    });
  });
});