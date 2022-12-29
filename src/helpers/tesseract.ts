const tesseract = require("node-tesseract-ocr")
import shell from 'shelljs'

const props = process.argv
const path = props[2]

// shell.exec('pwd')

const config = {
	lang: "eng",
	oem: 1,
	psm: 3,
}

tesseract
	.recognize(path, config)
	.then((text: string) => {
		console.log(text)
	})
	.catch((error: any) => {
		console.log(error.message)
	})