const {
  add,
  subtract
} = require("./math");

const {
  test,
  expect
} = require("./assertion-library");

let result, expected;

test('verify if the math add function is working correctly', () => {
  result = add(2, 3);
  expected = 5;
  expect(result).tobe(expected);
});

test('verify if the math substract function is working correctly', () => {
  result = subtract(4, 2);
  expected = 2;
  expect(result).tobe(expected);
});