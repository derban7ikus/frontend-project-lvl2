import { readFileSync } from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const parser = (filepath) => {
  const absolutePath = (filepath) => path.resolve(process.cwd(), filepath);
  const data = readFileSync(absolutePath(filepath), 'utf8');
  const format = path.extname(filepath);

  if (format === '.yml' || format === '.yaml') {
    return yaml.load(data);
  } else if (format === '.json') {
    return JSON.parse(data);
  }
};

export default parser;