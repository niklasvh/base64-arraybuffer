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
    if (view1[i] === undefined || view1[i] !== view2[i]) {
      return false;
    }
  }
  return true;
}

function rangeArrayBuffer() {
  const buffer = new ArrayBuffer(256);
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < 256; i++) {
    bytes[i] = i
  }

  return buffer;
}

describe('encode', () => {
  it('encode "Hello world"', () => equal(encode(stringArrayBuffer("Hello world")), "SGVsbG8gd29ybGQ="));
  it('encode "Man"', () => equal(encode(stringArrayBuffer("Man")), "TWFu"));
  it('encode "Ma"', () => equal(encode(stringArrayBuffer("Ma")), "TWE="));
  it('encode "Hello worlds!"', () => equal(encode(stringArrayBuffer("Hello worlds!")), "SGVsbG8gd29ybGRzIQ=="));
  it('encode all binary characters', () => equal(encode(rangeArrayBuffer()), "AAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc4OTo7PD0+P0BBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWltcXV5fYGFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6e3x9fn+AgYKDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbnJ2en6ChoqOkpaanqKmqq6ytrq+wsbKztLW2t7i5uru8vb6/wMHCw8TFxsfIycrLzM3Oz9DR0tPU1dbX2Nna29zd3t/g4eLj5OXm5+jp6uvs7e7v8PHy8/T19vf4+fr7/P3+/w=="));
});

describe('decode', () => {
  it('decode "Man"', () => ok(testArrayBuffers(decode("TWFu"), stringArrayBuffer("Man"))));
  it('decode "Hello world"', () => ok(testArrayBuffers(decode("SGVsbG8gd29ybGQ="), stringArrayBuffer("Hello world"))));
  it('decode "Hello worlds!"', () => ok(testArrayBuffers(decode("SGVsbG8gd29ybGRzIQ=="), stringArrayBuffer("Hello worlds!"))));
  it('decode all binary characters', () => ok(testArrayBuffers(decode("AAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc4OTo7PD0+P0BBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWltcXV5fYGFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6e3x9fn+AgYKDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbnJ2en6ChoqOkpaanqKmqq6ytrq+wsbKztLW2t7i5uru8vb6/wMHCw8TFxsfIycrLzM3Oz9DR0tPU1dbX2Nna29zd3t/g4eLj5OXm5+jp6uvs7e7v8PHy8/T19vf4+fr7/P3+/w=="), rangeArrayBuffer())));
});
