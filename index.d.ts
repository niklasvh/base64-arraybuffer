declare module 'base64-arraybuffer' {
    class Base64ArrayBuffer {
        encode(buffer: ArrayBuffer): string;

        decode(str: string): ArrayBuffer
    }
    export default new Base64ArrayBuffer();
}

