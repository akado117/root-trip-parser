const fs = require('fs');
const path = require('path');
const DriverController = require('./src/Controllers/DriverController');

function mainApp(fileData) {
  // Using regex to make end of line OS agnostic
const splitFileRegex = new RegExp('\r\n|\r|\n', 'g');
const fileLines = fileData.split(splitFileRegex);

/* Parse file data */
const driverC = new DriverController();

fileLines.forEach((fileLine, idx) => {
  try {
    driverC.parseCommand(fileLine)
  } catch (e) {
    console.log(`Failed on line ${idx} with data: ${fileLine}`)
    throw new Error(e);
  }
})

/* Report after parsing */
const consolidatedDrivers = driverC.getDrivers().sort((a,b) => {
  return a.getTotalDistance() > b.getTotalDistance() ? -1 : 1;
})

for (const driver of consolidatedDrivers) {
  const name = driver.getName();
  const distance = Math.round(driver.getTotalDistance());
  const speed = Math.round(driver.getAverageSpeed());
  console.log(`${name}: ${distance} miles ${speed ? `@ ${speed} mph` : '' }`)
}
}




const encoding = 'utf-8';

let fileData
/* File Data Ops */
//is terminal or piped in data
if (process.stdin.isTTY) {
  const inputPath = process.argv[2];

  // File not passed in
  if (typeof inputPath !== 'string') return console.log('Please include a path to your file')

  let filePath = path.join(__dirname, inputPath);

  fileData = fs.readFileSync(filePath, encoding);
  // Check if user is passing in an absolute path
  if (!fileData) fileData = fs.readFileSync(inputPath, encoding);
  if (!fileData) return console.log('File not found. Please verify your path to file (accepts absolute and relative)');
  mainApp(fileData)
} else {
  fileData = '';
  process.stdin.setEncoding(encoding);
  process.stdin.on('readable', function() {
    let chunk;
    while (chunk = process.stdin.read()) {
      fileData += chunk;
    }
  });
 
  process.stdin.on('end', function () {
    // There will be a trailing \n from the user hitting enter. Get rid of it.
    fileData = fileData.replace(/\n$/, '');
    mainApp(fileData);
  });
}