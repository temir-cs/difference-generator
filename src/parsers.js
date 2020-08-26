import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

// Get and parse the given file from the filepath
export default (filepath) => {
  // Build a full path to file
  const fullPath = path.resolve('./', filepath);
  // Get the file extension with path.extname
  const extension = path.extname(fullPath);
  // Read file data
  const data = fs.readFileSync(fullPath);

  // Select parser based on the file extension
  let parse;
  switch (extension) {
    case '.json':
      parse = JSON.parse;
      break;
    case '.yml':
      parse = yaml.safeLoad;
      break;
    default:
      throw new Error('Unknown extension!');
  }
  // Return parsed data
  return parse(data);
};
