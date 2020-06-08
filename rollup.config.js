export default {
	input: "lib/base64-arraybuffer.js",
	output: [
		{
			file: "dist/base64-arraybuffer.js",
			format: "cjs",
			sourcemap: true
		},
		{
			file: "dist/base64-arraybuffer.mjs",
			format: "es",
			sourcemap: true
		}
	]
}
