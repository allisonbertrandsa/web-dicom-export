import { PDFDocument, StandardFonts } from "pdf-lib";
import type { SenoGramReportState } from "./types";

export interface ReportPdfRenderer {
  render(report: SenoGramReportState): Promise<Uint8Array>;
}

export class StructuredReportPdfRenderer implements ReportPdfRenderer {
  async render(report: SenoGramReportState): Promise<Uint8Array> {
    const pdf = await PDFDocument.create();
    const page = pdf.addPage([612, 792]);
    const font = await pdf.embedFont(StandardFonts.Helvetica);
    const bold = await pdf.embedFont(StandardFonts.HelveticaBold);

    const lines = [
      `Patient ID: ${report.patient.patientId}`,
      `Patient Name: ${report.patient.patientName}`,
      `Birth Date: ${report.patient.patientBirthDate}`,
      `Source: ${report.provenance.sourceUrl}`,
      `Exported At: ${report.provenance.exportedAt.toISOString()}`
    ];

    page.drawText(report.documentTitle, { x: 72, y: 720, font: bold, size: 18 });
    lines.forEach((line, index) => {
      page.drawText(line, { x: 72, y: 680 - index * 20, font, size: 11 });
    });

    page.drawText("Scoring Summary", { x: 72, y: 540, font: bold, size: 14 });
    Object.entries(report.scoringSummary).forEach(([key, value], index) => {
      page.drawText(`${key}: ${String(value)}`, {
        x: 72,
        y: 512 - index * 18,
        font,
        size: 10
      });
    });

    return pdf.save();
  }
}
