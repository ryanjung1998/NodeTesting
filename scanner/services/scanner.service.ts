// import { HttpBadRequestError } from "../errors/http.error.js";
import Tesseract from 'tesseract.js'; //Javascript OCR 

type Tag = {
    material: string;
    percentage: string;
}

class ScannerService{

    getTextFromImage = async(imagePath: string): Promise<string> => {
        return new Promise<string>((resolve, reject) => {
            Tesseract.recognize(imagePath,'eng',{
            // logger: info => console.log(info), // optional logger function
          })
            .then(({ data: { text } }) => {
              resolve(text);
              return text;
            })
            .catch((error) => {
              reject(error);
            });
        });
      }

    getMaterials = async(txt: string): Promise<string> => {
        const regex = /(100|\d{1,2})% *(\b\w+\b)/g;
        let m;
        let scannedTags: Tag[] = [];
        do {
          m = regex.exec(txt);
          if (m){
            scannedTags.push({
              material: m[2],
              percentage: m[1]
            });
          }
        }while (m);
        console.log(JSON.stringify(scannedTags));
        return JSON.stringify(scannedTags);
      }
}


export default ScannerService;