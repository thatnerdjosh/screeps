const fs = require('fs');
const https = require('https');
const path = require('path');
var config = require('./config.json');
const [, , branchName] = process.argv;

if (!branchName) {
  console.error('Error: Please provide branch name.');
  console.log('Usage: node upload.js <branch_name>');
  process.exit(1);
}

var token = config.token,
    data = {
        branch: branchName,
        modules: {}
    };

const baseDir = branchName + "/dist";

const files = fs.readdirSync(baseDir);
const jsFiles = files.filter((file) => path.extname(file) === '.js');

for (const file of jsFiles) {
  const filePath = path.join(__dirname + "/", baseDir, file);
  const sourceMapPath = path.join(filePath, ".map"); // Add .map extension

  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const filename = path.basename(file, '.js'); // Avoid string concatenation

    data.modules[filename] = content;

    // Check if source map file exists
    if (fs.existsSync(sourceMapPath)) {
      const sourceMapContent = fs.readFileSync(sourceMapPath, 'utf8');
      data.sourceMaps[filename] = sourceMapContent; // Add source map data to object
    }
  } catch (err) {
    console.error(`Error reading file ${filePath}: ${err}`);
  }
}

var req = https.request({
    hostname: 'screeps.com',
    port: 443,
    path: '/api/user/code',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'X-Token': token,
    }
}, (res) => {
    res.on('data', (d) => {
        process.stdout.write(d);
    });
});

req.write(JSON.stringify(data));
req.end();

