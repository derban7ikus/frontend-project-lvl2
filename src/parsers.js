import { readFileSync } from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const parser = (filepath) => {
  const absolutePath = (pathToFile) => path.resolve(process.cwd(), pathToFile);
  const data = readFileSync(absolutePath(filepath), 'utf8');
  const format = path.extname(filepath);

  if (format === '.yml' || format === '.yaml') {
    return yaml.load(data);
  } return JSON.parse(data);
};

export default parser;