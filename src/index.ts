const 
    chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
    charsUrl = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_',

    genLookup = (target: string) => {
        let lookupTemp = typeof Uint8Array === 'undefined' ? [] : new Uint8Array(256);
        for (let i = 0; i < chars.length; i++) {
            lookupTemp[target.charCodeAt(i)] = i;
        }
        return lookupTemp;
    },
    
    // Use a lookup table to find the index.
    lookup = genLookup(chars),
    lookupUrl = genLookup(charsUrl); 

export const encode = (arraybuffer: ArrayBuffer, urlMode?: boolean): string => {
    let bytes = new Uint8Array(arraybuffer),
        i,
        len = bytes.length,
        base64 = '',
        target = urlMode ? charsUrl : chars;

    for (i = 0; i < len; i += 3) {
        base64 += target[bytes[i] >> 2];
        base64 += target[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
        base64 += target[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
        base64 += target[bytes[i + 2] & 63];
    }

    if (len % 3 === 2) {
        base64 = base64.substring(0, base64.length - 1) + (urlMode ? '' : '=');
    } else if (len % 3 === 1) {
        base64 = base64.substring(0, base64.length - 2) + (urlMode ? '' : '==');
    }

    return base64;
};

export const decode = (base64: string, urlMode?: boolean): ArrayBuffer => {
    let bufferLength = base64.length * 0.75,
        len = base64.length,
        i,
        p = 0,
        encoded1,
        encoded2,
        encoded3,
        encoded4;

    if (base64[base64.length - 1] === '=') {
        bufferLength--;
        if (base64[base64.length - 2] === '=') {
            bufferLength--;
        }
    }

    const 
        arraybuffer = new ArrayBuffer(bufferLength),
        bytes = new Uint8Array(arraybuffer),
        target = urlMode ? lookupUrl : lookup;

    for (i = 0; i < len; i += 4) {
        encoded1 = target[base64.charCodeAt(i)];
        encoded2 = target[base64.charCodeAt(i + 1)];
        encoded3 = target[base64.charCodeAt(i + 2)];
        encoded4 = target[base64.charCodeAt(i + 3)];

        bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
        bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
        bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
    }

    return arraybuffer;
};
