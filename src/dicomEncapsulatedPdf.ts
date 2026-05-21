import type { DicomInstance, EncapsulatedPdfDicomMetadata } from "./types";
import { createDicomUid } from "./uids";

export const ENCAPSULATED_PDF_STORAGE_SOP_CLASS_UID =
  "1.2.840.10008.5.1.4.1.1.104.1";

export interface EncapsulatedPdfDicomBuilder {
  build(pdfBytes: Uint8Array, metadata: EncapsulatedPdfDicomMetadata): Promise<DicomInstance>;
}

export class DcmjsEncapsulatedPdfDicomBuilder implements EncapsulatedPdfDicomBuilder {
  async build(pdfBytes: Uint8Array, metadata: EncapsulatedPdfDicomMetadata): Promise<DicomInstance> {
    const sopInstanceUid = createDicomUid();
    const studyInstanceUid = metadata.study.studyInstanceUid ?? createDicomUid();
    const seriesInstanceUid = createDicomUid();

    void pdfBytes;
    void metadata;

    throw new Error(
      [
        "DICOM Encapsulated PDF serialization is not implemented yet.",
        "Use this class boundary to map metadata to dcmjs and write a PS3.10 file.",
        `SOPClassUID must be ${ENCAPSULATED_PDF_STORAGE_SOP_CLASS_UID}.`,
        `Prepared UIDs: study=${studyInstanceUid}, series=${seriesInstanceUid}, sop=${sopInstanceUid}.`
      ].join(" ")
    );
  }
}
