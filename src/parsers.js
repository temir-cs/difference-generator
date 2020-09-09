import yaml from 'js-yaml';
import ini from 'ini';

// Select parser and parse data based on the file extension
const parsers = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.ini': ini.parse,
};

export default (data, extension) => {
  const parse = parsers[extension];
  if (!parse) {
    throw new Error('Unknown file extension!');
  }
  return parse(data);
};
