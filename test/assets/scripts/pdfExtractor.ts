import { PDFExtract, PDFExtractOptions } from 'pdf.js-extract';

const pdfExtract = new PDFExtract();
const options: PDFExtractOptions = {
  lastPage: 1, normalizeWhitespace: false, disableCombineTextItems: true
};

export class pdfResults {
  completeText: string
  bulletPoints: string[]
}

export class PdfExtractor {

  async extractor(filePath: string): Promise<pdfResults> {
    let results = new pdfResults();
    let data = await pdfExtract.extract(filePath, options);

    let text = "";
    let addContent = false;
    let loopCounter = 0;
    let pointList: string[] = [];
    let completeText: string = '';

    for (const value of data['pages'][0]['content']) {
      // Always Looking at the first page.

      if (value['str'].toLowerCase().includes("responsibilities")) {
        addContent = true;
        loopCounter = 0;
      }

      if (loopCounter != 0) {
        // Start to add content

        if (value['fontName'] == 'g_d0_f2') {
          // If Next Heading Found -> Stop
          addContent = false;
          loopCounter = 0;
          continue;
        }

        if (addContent == true) {
          // If addContent Still True -> Concatnate to existing content
          text += value['str']
        }
      }
      loopCounter++;
    }

    if (text.includes("\u2022")) {
      // Check For Bullet Point
      // If True We Split By Closing Sentance '.'

      let tempText = text.split('.')

      for (let item in tempText) {
        let textSample = tempText[item]

        if (textSample.includes("\u2022")) {

          if (textSample.indexOf(':') !== -1) {
            let startIdx = textSample.indexOf(':') + 1;
            textSample = textSample.substring(startIdx)
            let startIdxPoint = textSample.indexOf("\u2022") + 1;
            pointList.push(textSample.substring(startIdxPoint).trim())
            continue;
          }

          let startIdxPoint = textSample.indexOf("\u2022") + 1;
          pointList.push(textSample.substring(startIdxPoint).trim())

        } else {
          completeText += textSample;
        }
      }

      // Return the single block of text along with bullet points in a list.
      results.completeText = completeText
      results.bulletPoints = pointList
      return results

    } else {

      // Return the single block of text.
      results.completeText = text
      results.bulletPoints = []
      return results
    }
  }
}
