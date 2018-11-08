const Driver = require('./Driver');
const Trip = require('../Trip');

jest.mock(Trip);

describe('Driver Class', () => {
  let driver;
  beforeEach(() => {
    driver = new Driver('Alex');
  });
  describe('constructor', () => {
    test('should add drivers name to object and initialize average speed, total distance, and total time to zero', () => {
      // already constructed on every test run
      expect(driver._name).toEqual('Alex');
      expect(driver._totalTime).toEqual(0);
      expect(driver._totalDistance).toEqual(0);
      expect(driver._averageSpeed).toEqual(0);
      expect(driver._trips).toEqual([]);
    });
  });
  describe('getTotalDistance', () => {
    test('should return totalDistance for Driver', () => {
      driver._totalDistance = 123;
      expect(driver.getTotalDistance).toEqual(123);
    });
  });
  describe('getTotalTime', () => {
    test('should return totalTime for Driver', () => {
      driver._totalTime = 123;
      expect(driver.getTotalTime).toEqual(123);
    });
  });
  describe('getAverageSpeed', () => {
    test('should return averageSpeed for Driver', () => {
      driver._averageSpeed = 123;
      expect(driver.getAverageSpeed).toEqual(123);
    });
  });
  describe('addTrip', () => {
    test('should return false and not add trip if missing correct args', () => {
      expect(driver.addTrip('12:12', '12:12', 'test')).toEqual(false);
      expect(driver.addTrip('12:32', 'is', 123)).toEqual(false);
      expect(driver.addTrip('asdasd', '12:32', 123)).toEqual(false);
      expect(driver._trips.length).toEqual(0);
    });
    test('should create a new trip object and add it to trips after adding time and distance to totalTime and Totaldistance', () => {
      Trip.getDistance.mockImplementation(() => 12);
      Trip.getDuration.mockImplementation(() => 50);
      
      driver.addTrip('12:00', '12:30', 123);
      
      expect(driver._trips.length).toEqual(1);
      expect(driver._totalTime).toEqual(50);
      expect(driver._totalDistance).toEqual(12);
    });
  });
});
