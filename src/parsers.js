import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

// Get and parse the given file from the filepath
export default (filepath) => {
  // Build a full path to file
  const fullPath = path.resolve('./', filepath);
  // Get the file extension with path.extname
  const extension = path.extname(fullPath);
  // Read file data
  const data = fs.readFileSync(fullPath, 'utf-8');

  // Select parser based on the file extension
  switch (extension) {
    case '.json':
      return JSON.parse(data);
    case '.yml':
      return yaml.safeLoad(data);
    case '.ini':
      return ini.parse(data);
    default:
      throw new Error('Unknown extension!');
  }
};
