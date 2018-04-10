(function(){
  "use strict";
  var base64_arraybuffer = require('../lib/base64-arraybuffer.js');

  /*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/


  function stringArrayBuffer(str) {
    var buffer = new ArrayBuffer(str.length);
    var bytes = new Uint8Array(buffer);

    str.split('').forEach(function(str, i) {
      bytes[i] = str.charCodeAt(0);
    });

    return buffer;
  }

  function rangeArrayBuffer() {
    var buffer = new ArrayBuffer(256);
    var bytes = new Uint8Array(buffer);
    for (var i = 0; i < 256; i++)
      bytes[i] = i
    return buffer;
  }

  function testArrayBuffers(buffer1, buffer2) {
    var len1 = buffer1.byteLength;
    var len2 = buffer2.byteLength;
    var view1 = new Uint8Array(buffer1);
    var view2 = new Uint8Array(buffer2);

    if (len1 !== len2) {
      return false;
    }

    for (var i = 0; i < len1; i++) {
      if (view1[i] === void 0 || view1[i] !== view2[i]) {
        return false;
      }
    }
    return true;
  }

  exports['base64tests'] = {
    'encode': function(test) {
      test.expect(5);

      test.equal(base64_arraybuffer.encode(stringArrayBuffer("Hello world")), "SGVsbG8gd29ybGQ=", 'encode "Hello world"');
      test.equal(base64_arraybuffer.encode(stringArrayBuffer("Man")), 'TWFu', 'encode "Man"');
      test.equal(base64_arraybuffer.encode(stringArrayBuffer("Ma")), "TWE=", 'encode "Ma"');
      test.equal(base64_arraybuffer.encode(stringArrayBuffer("Hello worlds!")), "SGVsbG8gd29ybGRzIQ==", 'encode "Hello worlds!"');
      test.equal(base64_arraybuffer.encode(rangeArrayBuffer()), "AAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc4OTo7PD0+P0BBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWltcXV5fYGFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6e3x9fn+AgYKDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbnJ2en6ChoqOkpaanqKmqq6ytrq+wsbKztLW2t7i5uru8vb6/wMHCw8TFxsfIycrLzM3Oz9DR0tPU1dbX2Nna29zd3t/g4eLj5OXm5+jp6uvs7e7v8PHy8/T19vf4+fr7/P3+/w==", 'encode all binary characters');
      test.done();
    },
    'decode': function(test) {
      test.expect(4);
      test.ok(testArrayBuffers(base64_arraybuffer.decode("TWFu"), stringArrayBuffer("Man")), 'decode "Man"');
      test.ok(testArrayBuffers(base64_arraybuffer.decode("SGVsbG8gd29ybGQ="), stringArrayBuffer("Hello world")), 'decode "Hello world"');
      test.ok(testArrayBuffers(base64_arraybuffer.decode("SGVsbG8gd29ybGRzIQ=="), stringArrayBuffer("Hello worlds!")), 'decode "Hello worlds!"');
      test.ok(testArrayBuffers(base64_arraybuffer.decode("AAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc4OTo7PD0+P0BBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWltcXV5fYGFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6e3x9fn+AgYKDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbnJ2en6ChoqOkpaanqKmqq6ytrq+wsbKztLW2t7i5uru8vb6/wMHCw8TFxsfIycrLzM3Oz9DR0tPU1dbX2Nna29zd3t/g4eLj5OXm5+jp6uvs7e7v8PHy8/T19vf4+fr7/P3+/w=="), rangeArrayBuffer()), 'decode all binary characters');
      test.done();
    }
  };
})();
