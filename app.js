const fs = require('fs');
const path = require('path');
const Main = require('./src/Main');

/* File Data Ops */
const inputPath = process.argv[2];
if (typeof inputPath !== 'string') return console.log('Please include a path to your file')

filePath = path.join(__dirname, inputPath);

let fileData = fs.readFileSync(filePath, 'utf-8');
// Check if user is passing in an absolute path
if (!fileData) fileData = fs.readFileSync(inputPath, 'utf-8');
if (!fileData) return console.log('File not found. Please verify your path to file (accepts absolute and relative)');

// Using regex to make end of line OS agnostic
const splitFileRegex = new RegExp('\r\n|\r|\n', 'g');
const fileLines = fileData.split(splitFileRegex);

/* Parse file data */
const main = new Main();

fileLines.forEach((fileLine, idx) => {
  try {
    main.parseCommand(fileLine)
  } catch (e) {
    console.log(`Failed on line ${idx} with data: ${fileLine}`)
    throw new Error(e);
  }
})

/* Report after parsing */
const consolidatedDrivers = main.getDrivers().sort((a,b) => {
  return a.getTotalDistance() > b.getTotalDistance() ? -1 : 1;
})

for (const driver of consolidatedDrivers) {
  const name = driver.getName();
  const distance = Math.round(driver.getTotalDistance());
  const speed = Math.round(driver.getAverageSpeed());
  console.log(`${name}: ${distance} miles ${speed ? `@ ${speed} mph` : '' }`)
}