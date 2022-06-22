import { greeter } from '../index';

test('My Greeter', () => {
  expect(greeter('Del')).toBe('Hello Del');
});
