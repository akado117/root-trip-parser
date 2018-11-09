const DriverController = require('./DriverController');
const Driver = require('../Models/Driver');
const { stubPrototype } = require('../helpers/testHelpers');

jest.mock('../Models/Driver');

describe('DriverController class', () => {
  let driverC;
  beforeEach(() => {
    Driver.mockClear();
    driverC = new DriverController();
  });
  describe('constructor', () => {
    test('should create an empty object on this._drivers', () => {
      // Already called in before each
      expect(driverC._drivers).toEqual({});
    });
  });
  describe('parseCommand', () => {
    test('should call _addDriver when driver command entered', () => {
      const restoreFunc = stubPrototype(DriverController, '_addDriver');
      try {
        driverC.parseCommand('Driver Aslan');
        expect(driverC._addDriver).toHaveBeenCalled();

        restoreFunc();
      } catch (e) {
        restoreFunc();
        throw new Error(e);
      }
    });
    test('should call _addTripToDriver when trip command entered', () => {
      const restoreFunc = stubPrototype(DriverController, '_addTripToDriver');
      try {
        driverC.parseCommand('Trip Aslan 04:40 05:50 12');
        expect(driverC._addTripToDriver).toHaveBeenCalled();

        restoreFunc();
      } catch (e) {
        restoreFunc();
        throw new Error(e);
      }
    });
  });
  describe('_addDriver', () => {
    test('should create a driver object and add to main._drivers keyed by driver name', () => {
      expect(driverC._addDriver('Aslan')).toEqual(true);

      expect(driverC._drivers.Aslan).toBe(Driver.mock.instances[0]);
      expect(Driver).toBeCalledWith('Aslan');
      expect(Driver).toHaveBeenCalledTimes(1);
    });
    test('should return false if driver already exists and keep original driver', () => {
      const driver = new Driver('Aslan');
      driverC._drivers = { Aslan: driver };
      expect(driverC._addDriver('Aslan')).toEqual(false);

      expect(driverC._drivers.Aslan).toBe(driver);
      // should have only been called the one time
      expect(Driver).toHaveBeenCalledTimes(1);
    });
  });
  describe('_addTripToDriver', () => {
    test('should call addTrip on correct driver object', () => {
      const driver = new Driver('Aslan');
      driverC._drivers = { Aslan: driver };
      driver.addTrip.mockImplementation(() => true);
      
      expect(driverC._addTripToDriver('Aslan', '05:30', '06:30', 12)).toEqual(true);
      expect(driver.addTrip).toBeCalledWith('05:30', '06:30', 12);
    });
    test('should return false if valid driver doesn\'t exist', () => {
      const driver = new Driver('Jadis');
      driverC._drivers = { Jadis: driver };
      driver.addTrip.mockImplementation(() => true);
      
      expect(driverC._addTripToDriver('Aslan', '05:30', '06:30', 12)).toEqual(false);
      expect(driver.addTrip).toHaveBeenCalledTimes(0);
    });
    test('should return false if trip args are incorrect', () => {
      const driver = new Driver('Jadis');
      driverC._drivers = { Jadis: driver };
      driver.addTrip.mockImplementation(() => false);
      
      expect(driverC._addTripToDriver('Aslan', '05:30', '06:30', 12)).toEqual(false);
      expect(driver.addTrip).toHaveBeenCalledTimes(0);
    });
  });
  describe('getDrivers', () => {
    const drivers = {
      Aslan: 'lion',
      Lucy: 'princess',
      Jadis: 'scary',
    };
    test('should get drivers in an array', () => {
      driverC._drivers = drivers;
      expect(driverC.getDrivers().length).toEqual(3);
    });
  });
});
