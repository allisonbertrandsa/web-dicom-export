import type {
  DicomStoreClient,
  DicomStoreResult,
  EncapsulatedPdfDicomMetadata,
  SenoGramReportState
} from "./types";
import type { EncapsulatedPdfDicomBuilder } from "./dicomEncapsulatedPdf";
import type { ReportPdfRenderer } from "./reportPdf";

export interface ExportWorkflow {
  exportToPacs(report: SenoGramReportState): Promise<DicomStoreResult>;
}

export class BrowserDicomPdfExportWorkflow implements ExportWorkflow {
  constructor(
    private readonly pdfRenderer: ReportPdfRenderer,
    private readonly dicomBuilder: EncapsulatedPdfDicomBuilder,
    private readonly storeClient: DicomStoreClient
  ) {}

  async exportToPacs(report: SenoGramReportState): Promise<DicomStoreResult> {
    const pdfBytes = await this.pdfRenderer.render(report);
    const metadata: EncapsulatedPdfDicomMetadata = {
      patient: report.patient,
      study: {},
      documentTitle: report.documentTitle,
      manufacturer: "Seno Medical",
      burnedInAnnotation: true,
      exportedAt: report.provenance.exportedAt
    };
    const dicomInstance = await this.dicomBuilder.build(pdfBytes, metadata);

    return this.storeClient.store(dicomInstance);
  }
}
