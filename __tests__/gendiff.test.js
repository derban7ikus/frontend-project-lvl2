import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const cases = [
  [ 'bigFile1.json', 'bigFile2.json', 'jsonresult.txt', 'json' ],
  [ 'bigFile1.yaml', 'bigFile2.yaml', 'stylishresult.txt', 'stylish' ],
  [ 'bigFile1.json', 'bigFile2.json', 'stylishresult.txt', 'stylish' ],
  [ 'bigFile1.json', 'bigFile2.json', 'plainresult.txt', 'plain' ],
];

test.each(cases)('Each test got to equal correspondent result', (firstArg, secondArg, expectedResult, format) => {
  const firstFile = getFixturePath(firstArg);
  const secondFile = getFixturePath(secondArg);
  const getResult = readFile(expectedResult);
  const result = genDiff(firstFile, secondFile, format);
  expect(result).toEqual(getResult);
});