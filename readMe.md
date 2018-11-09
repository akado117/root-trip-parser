# Root Driver Trip Consolidation Tool
### Preproject Problem Break Down
Input formatted driver data from file and output averages to new file. Should exclude "outlier" speeds aka average speeds under 5 MPH and over 100 MPH. 

##### Axioms
Driver names are unique AND case sensitive.
Times should be standard but will validate accordingly
All parsed time data will be stored as minutes.
All distances are in miles.
(Given) Time ranges are for a single day aka no 24 hour time wrap past midnight.
Commands `Driver` and `Trip` are case sensitive
File length and memory required will be manageable for a single Node runtime.
User will have modern version of Node/NPM on their machine (node v8.x.x+).
App is brittle and will throw errors when encountering incorrect input data.

##### Core Object Break Down
`Drivers` should contain `Trips` and also track/update total drive time and miles. `Drivers` also should be able to return time/miles driven, and trips drive. Should include function to calculate and store average speed when called.
`Trips` need to be able to parse drive time into time on road, and store it. It should also store distance driven.
`Main` takes commands. Then parse data to build Drivers and add trips to drivers based upon commands. 

- Driver 
-- trips, total distance driven, and time driven, average speed - getters
-- addTrip function
-- calculateAverageSpeed

- Trip
-- construtor - store and parse time and distance
-- parseTime function to parse time into duration
-- duration, and distance getters

- Main
-- parseCommand function - takes in command and builds/stores Driver or adds trip to driver
-- getDrivers - returns drivers so calling medium can do whatever is needed with the information


### Updates While Implementing
- Adding validation for correct constructor arguments when creating Trips
- No reason to have getters for start/end time for Trip
- Was going to do string manipulation and math to get duraction in trip, date objects should be more readable even if there's a performance hit
- Breaking out parseCommand so it can call seperate functions within main from itself. `_addDriver` and `_addTripToDriver`