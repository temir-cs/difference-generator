import stylish from './stylish.js';
import plain from './plain.js';

export default (formatterName, diff) => {
  switch (formatterName) {
    case 'stylish':
      return stylish(diff);
    case 'plain':
      return plain(diff);
    default:
      throw new Error('Unknown formatter!');
  }
};
