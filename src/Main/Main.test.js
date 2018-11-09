const Main = require('./Main');
const Driver = require('../Driver');
const { stubPrototype } = require('../helpers/testHelpers');

jest.mock('../Driver');

describe('Main class', () => {
  let main;
  beforeEach(() => {
    Driver.mockClear();
    main = new Main();
  });
  describe('constructor', () => {
    test('should create an empty object on this._drivers', () => {
      // Already called in before each
      expect(main._drivers).toEqual({});
    });
  });
  describe('parseCommand', () => {
    test('should call _addDriver when driver command entered', () => {
      const restoreFunc = stubPrototype(Main, '_addDriver');
      try {
        main.parseCommand('Driver Aslan');
        expect(main._addDriver).toHaveBeenCalled();

        restoreFunc();
      } catch (e) {
        restoreFunc();
        throw new Error(e);
      }
    });
    test('should call _addTripToDriver when trip command entered', () => {
      const restoreFunc = stubPrototype(Main, '_addTripToDriver');
      try {
        main.parseCommand('Trip Aslan 04:40 05:50 12');
        expect(main._addTripToDriver).toHaveBeenCalled();

        restoreFunc();
      } catch (e) {
        restoreFunc();
        throw new Error(e);
      }
    });
  });
  describe('_addDriver', () => {
    test('should create a driver object and add to main._drivers keyed by driver name', () => {
      expect(main._addDriver('Aslan')).toEqual(true);

      expect(main._drivers.Aslan).toBe(Driver.mock.instances[0]);
      expect(Driver).toBeCalledWith('Aslan');
      expect(Driver).toHaveBeenCalledTimes(1);
    });
    test('should return false if driver already exists and keep original driver', () => {
      const driver = new Driver('Aslan');
      main._drivers = { Aslan: driver };
      expect(main._addDriver('Aslan')).toEqual(false);

      expect(main._drivers.Aslan).toBe(driver);
      // should have only been called the one time
      expect(Driver).toHaveBeenCalledTimes(1);
    });
  });
  describe('_addTripToDriver', () => {
    test('should call addTrip on correct driver object', () => {
      const driver = new Driver('Aslan');
      main._drivers = { Aslan: driver };
      driver.addTrip.mockImplementation(() => true);
      
      expect(main._addTripToDriver('Aslan', '05:30', '06:30', 12)).toEqual(true);
      expect(driver.addTrip).toBeCalledWith('05:30', '06:30', 12);
    });
    test('should return false if valid driver doesn\'t exist', () => {
      const driver = new Driver('Jadis');
      main._drivers = { Jadis: driver };
      driver.addTrip.mockImplementation(() => true);
      
      expect(main._addTripToDriver('Aslan', '05:30', '06:30', 12)).toEqual(false);
      expect(driver.addTrip).toHaveBeenCalledTimes(0);
    });
    test('should return false if trip args are incorrect', () => {
      const driver = new Driver('Jadis');
      main._drivers = { Jadis: driver };
      driver.addTrip.mockImplementation(() => false);
      
      expect(main._addTripToDriver('Aslan', '05:30', '06:30', 12)).toEqual(false);
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
      main._drivers = drivers;
      expect(main.getDrivers().length).toEqual(3);
    });
  });
});
