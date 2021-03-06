const Driver = require('./Driver');
const Trip = require('../Trip/index');

jest.mock('../Trip');

describe('Driver Class', () => {
  let driver;
  const driverName = 'Alex'
  beforeEach(() => {
    Trip.mockClear();
    driver = new Driver(driverName);
  });
  describe('constructor', () => {
    test('should add drivers name to object and initialize average speed, total distance, and total time to zero', () => {
      // already constructed on every test run
      expect(driver._name).toEqual(driverName);
      expect(driver._totalTime).toEqual(0);
      expect(driver._totalDistance).toEqual(0);
      expect(driver._averageSpeed).toEqual(0);
      expect(driver._trips).toEqual([]);
    });
  });
  describe('getName', () => {
    test('should return driver name', () => {
      expect(driver.getName()).toEqual(driverName);
    });
  });
  describe('getTotalDistance', () => {
    test('should return totalDistance for Driver', () => {
      driver._totalDistance = 123;
      expect(driver.getTotalDistance()).toEqual(123);
    });
  });
  describe('getTotalTime', () => {
    test('should return totalTime for Driver', () => {
      driver._totalTime = 123;
      expect(driver.getTotalTime()).toEqual(123);
    });
  });
  describe('getAverageSpeed', () => {
    test('should return averageSpeed of 0 as default', () => {
      expect(driver.getAverageSpeed()).toEqual(0);
    });
    test('should return averageSpeed without recalculation when _isSpeedStale is false', () => {
      driver._averageSpeed = 123;
      expect(driver.getAverageSpeed()).toEqual(123);
    });
    test('should recalculate then store/return average speed if _isSpeedStale is true', () => {
      driver._averageSpeed = 60;
      driver._totalTime = 60;
      driver._totalDistance = 60;
      driver._isSpeedStale = true;
      expect(driver.getAverageSpeed()).toEqual(60);
      expect(driver._isSpeedStale).toEqual(false);
    });
  });
  describe('addTrip', () => {
    test('should return false and not add trip if trip failes to build', () => {
      Trip.mockImplementation(() => { throw new Error('Major Tom to ground control, we have a problem'); });
      expect(driver.addTrip('asdasd', '12:32', 123)).toEqual(false);
      expect(driver._trips.length).toEqual(0);
    });
    test('should create a new trip object and add it to trips after adding time and distance to totalTime and Totaldistance. Should also set _isSpeedStale to true', () => {
      Trip.mockImplementation(() => ({
        getDistance: jest.fn(() => 12),
        getDuration: jest.fn(() => 50),
        getAverageSpeed: jest.fn(() => 10),
      }));
      driver._isSpeedStale = false;
      
      expect(driver.addTrip('12:00', '12:30', 123)).toEqual(true);
      
      expect(driver._isSpeedStale).toEqual(true);
      expect(driver._trips.length).toEqual(1);
      expect(driver._trips[0].getDuration).toHaveBeenCalledTimes(1);
      expect(driver._trips[0].getDistance).toHaveBeenCalledTimes(1);
      expect(driver._totalTime).toEqual(50);
      expect(driver._totalDistance).toEqual(12);
    });
    test('should return false if average speed of trip is less than 5 or greater than 100 and should discard the trip', () => {
      Trip.mockImplementation(() => ({
        getAverageSpeed: jest.fn(() => 4),
      }));

      expect(driver.addTrip('12:00', '12:30', 123)).toEqual(false);

      Trip.mockImplementation(() => ({
        getAverageSpeed: jest.fn(() => 103),
      }));

      expect(driver.addTrip('12:00', '12:30', 123)).toEqual(false);
      expect(driver._trips.length).toEqual(0)
    });
  });
});
