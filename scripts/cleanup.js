const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const directories = ['../ios', '../android', '../node_modules'];

const cleanDirectory = (dir) => {
  const dirPath = path.join(__dirname, dir);
  if (!fs.existsSync(dirPath)) {
    console.warn(`${dirPath} does not exist`);
    return;
  }

  try {
    if (process.platform === 'darwin' || process.platform === 'linux') {
      // Use rm -rf for Unix-like systems
      execSync(`rm -rf "${dirPath}"`, { stdio: 'inherit' });
    } else {
      // For Windows
      execSync(`rmdir /s /q "${dirPath}"`, { stdio: 'inherit' });
    }
    console.info(`Deleted ${dirPath}`);
  } catch (error) {
    console.error(`Error deleting ${dirPath}:`, error.message);
  }
};

// Clean directories sequentially
directories.forEach(cleanDirectory);
