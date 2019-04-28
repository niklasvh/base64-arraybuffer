const {equal, ok} = require('assert');
const {encode, decode} = require('../lib/base64-arraybuffer.js');

function stringArrayBuffer(str) {
  const buffer = new ArrayBuffer(str.length);
  const bytes = new Uint8Array(buffer);

  str.split('').forEach(function(str, i) {
    bytes[i] = str.charCodeAt(0);
  });

  return buffer;
}

function testArrayBuffers(buffer1, buffer2) {
  const len1 = buffer1.byteLength;
  const len2 = buffer2.byteLength;
  const view1 = new Uint8Array(buffer1);
  const view2 = new Uint8Array(buffer2);

  if (len1 !== len2) {
    return false;
  }

  for (let i = 0; i < len1; i++) {
    if (!view1[i] || view1[i] !== view2[i]) {
      return false;
    }
  }
  return true;
}

describe('encode', () => {
  it('encode "Hello world"', () => equal(encode(stringArrayBuffer("Hello world")), "SGVsbG8gd29ybGQ="));
  it('encode "Man"', () => equal(encode(stringArrayBuffer("Man")), "TWFu"));
  it('encode "Ma"', () => equal(encode(stringArrayBuffer("Ma")), "TWE="));
  it('encode "Hello worlds!"', () => equal(encode(stringArrayBuffer("Hello worlds!")), "SGVsbG8gd29ybGRzIQ=="));
});

describe('decode', () => {
  it('decode "Man"', () => ok(testArrayBuffers(decode("TWFu"), stringArrayBuffer("Man"))));
  it('decode "Hello world"', () => ok(testArrayBuffers(decode("SGVsbG8gd29ybGQ="), stringArrayBuffer("Hello world"))));
  it('decode "Hello worlds!"', () => ok(testArrayBuffers(decode("SGVsbG8gd29ybGRzIQ=="), stringArrayBuffer("Hello worlds!"))));
});
