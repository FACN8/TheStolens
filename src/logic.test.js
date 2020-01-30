const logic = require("./logic.js");
const supertest = require("supertest");
const assert = require("assert");

test('creates array of elements', () => {
  const test1 = {
    tlv: {
      origin: 'tlv',
      price: '100'
    },
    bud: {
      origin: 'bud',
      price: '10'
    }
  };

  const result1 = [
    '<li><span>Origin: tlv</span><br><span>Price: 100</span></li>',
    '<li><span>Origin: bud</span><br><span>Price: 10</span></li>'
  ]
  
  const received = logic.createRouteElement(test1);

  console.log('EXPECTED: ' + result1);
  console.log('RECEIVED: ' + received);

  expect(received).toStrictEqual(result1);
});