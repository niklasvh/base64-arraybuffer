/**
 * Adapted from https://github.com/niklasvh/base64-arraybuffer
 * Will be remade using a WebAssembly module later on for performance
 */

export function encode(arraybuffer: ArrayBuffer): string {
  const bytes = new Uint8Array(arraybuffer)
  const len = bytes.length

  const base64: string[] = []

  for (let i = 0; i < len; i += 3) {
    base64.push(CHARS[bytes[i] >> 2])
    base64.push(CHARS[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)])
    base64.push(CHARS[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)])
    base64.push(CHARS[bytes[i + 2] & 63])
  }

  const str = base64.join('')

  if (len % 3 === 2) {
    return str.substring(0, str.length - 1) + '='
  } else if (len % 3 === 1) {
    return str.substring(0, str.length - 2) + '=='
  } else {
    return str
  }
}

export function decode(base64: string): ArrayBuffer {
  let bufferLength = base64.length * 0.75
  const len = base64.length

  if (base64.substr(-1) === '=') {
    bufferLength -= 1

    if (base64.substr(-2, 1) === '=') {
      bufferLength -= 1
    }
  }

  const decoded = new ArrayBuffer(bufferLength)
  const bytes = new Uint8Array(decoded)

  let p = 0

  for (let i = 0; i < len; i += 4) {
    const encoded1 = LOOKUP[base64.charCodeAt(i)]
    const encoded2 = LOOKUP[base64.charCodeAt(i + 1)]
    const encoded3 = LOOKUP[base64.charCodeAt(i + 2)]
    const encoded4 = LOOKUP[base64.charCodeAt(i + 3)]

    bytes[p++] = (encoded1 << 2) | (encoded2 >> 4)
    bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2)
    bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63)
  }

  return decoded
}

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

const LOOKUP = typeof Uint8Array === 'undefined' ? [] : new Uint8Array(256)

for (let i = 0; i < CHARS.length; i++) {
  LOOKUP[CHARS.charCodeAt(i)] = i
}
