import yaml from 'js-yaml';
import ini from 'ini';

// Select parser and parse data based on the file extension
export default (data, extension) => {
  switch (extension) {
    case '.json':
      return JSON.parse(data);
    case '.yml':
      return yaml.safeLoad(data);
    case '.ini':
      return ini.parse(data);
    default:
      throw new Error('Unknown file extension!');
  }
};
