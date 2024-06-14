const fs = require('fs');
const path = './package.json';

fs.readFile(path, (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const packageJson = JSON.parse(data);
  packageJson.scripts.start = "node src/index.js";  // Update this to match your main server file

  fs.writeFile(path, JSON.stringify(packageJson, null, 2), (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('package.json updated successfully');
  });
});
