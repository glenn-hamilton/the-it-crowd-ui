import { PdfExtractor } from "./scripts/pdfExtractor";


// Run pdf extractor
export class AssetRunner {

    pdfRunner(pdfPath: string) {
        let pdf = new PdfExtractor();

        pdf.extractor(pdfPath)
        .then(result => {
            // Console Log Results:
            console.log("\n\n\n\n");
            console.log(result.completeText);
            console.log("\n")
            console.log(result.bulletPoints);
        })
    }

}