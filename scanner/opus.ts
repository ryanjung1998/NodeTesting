import * as fs from 'fs';
import * as Tesseract from 'tesseract.js';
import * as ocrad from 'ocrad.js';

const imagePath = 'path/to/your/image.png';

// Using Tesseract.js
async function extractTextWithTesseract() {
  try {
    const { data: { text } } = await Tesseract.recognize(
      imagePath,
      'eng',
      { logger: info => console.log(info) }
    );

    console.log('Text extracted with Tesseract:', text);
  } catch (error) {
    console.error('Error extracting text with Tesseract:', error);
  }
}

// Using OCRad.js
function extractTextWithOCRad() {
  try {
    const imageBuffer = fs.readFileSync(imagePath);
    const text = ocrad(imageBuffer);

    console.log('Text extracted with OCRad:', text);
  } catch (error) {
    console.error('Error extracting text with OCRad:', error);
  }
}

// Run the extraction functions
extractTextWithTesseract();
extractTextWithOCRad();
