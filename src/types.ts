export interface PatientMetadata {
  patientId: string;
  patientName: string;
  patientBirthDate: string;
}

export interface ReportProvenance {
  sourceUrl: string;
  exportedAt: Date;
  applicationName: string;
  applicationVersion?: string;
}

export interface SenoGramReportState {
  patient: PatientMetadata;
  provenance: ReportProvenance;
  documentTitle: string;
  scoringSummary: Record<string, string | number | boolean | null>;
}

export interface DicomStudyContext {
  studyInstanceUid?: string;
  accessionNumber?: string;
  studyDescription?: string;
  seriesDescription?: string;
  referringPhysicianName?: string;
  institutionName?: string;
}

export interface EncapsulatedPdfDicomMetadata {
  patient: PatientMetadata;
  study: DicomStudyContext;
  documentTitle: string;
  manufacturer: string;
  burnedInAnnotation: boolean;
  exportedAt: Date;
}

export interface DicomInstance {
  sopClassUid: string;
  sopInstanceUid: string;
  studyInstanceUid: string;
  seriesInstanceUid: string;
  bytes: Uint8Array;
}

export interface DicomStoreResult {
  ok: boolean;
  statusCode?: number;
  studyInstanceUid?: string;
  sopInstanceUid?: string;
  message: string;
}

export interface DicomStoreClient {
  store(instance: DicomInstance): Promise<DicomStoreResult>;
}
