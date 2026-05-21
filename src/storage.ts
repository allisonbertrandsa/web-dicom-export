import type { DicomInstance, DicomStoreClient, DicomStoreResult } from "./types";

export interface DicomwebStoreClientOptions {
  stowRsBaseUrl: string;
  accessToken?: string;
}

export class DicomwebStoreClient implements DicomStoreClient {
  constructor(private readonly options: DicomwebStoreClientOptions) {}

  async store(instance: DicomInstance): Promise<DicomStoreResult> {
    const boundary = `dicom-${crypto.randomUUID()}`;
    const body = new Blob([
      `--${boundary}\r\n`,
      "Content-Type: application/dicom\r\n\r\n",
      instance.bytes,
      `\r\n--${boundary}--\r\n`
    ]);

    const response = await fetch(
      `${this.options.stowRsBaseUrl.replace(/\/$/, "")}/studies/${instance.studyInstanceUid}`,
      {
        method: "POST",
        headers: {
          "Content-Type": `multipart/related; type="application/dicom"; boundary=${boundary}`,
          ...(this.options.accessToken
            ? { Authorization: `Bearer ${this.options.accessToken}` }
            : {})
        },
        body
      }
    );

    return {
      ok: response.ok,
      statusCode: response.status,
      studyInstanceUid: instance.studyInstanceUid,
      sopInstanceUid: instance.sopInstanceUid,
      message: response.ok ? "Stored DICOM instance with STOW-RS." : await response.text()
    };
  }
}

export interface GatewayStoreClientOptions {
  gatewayUrl: string;
  accessToken?: string;
}

export class GatewayStoreClient implements DicomStoreClient {
  constructor(private readonly options: GatewayStoreClientOptions) {}

  async store(instance: DicomInstance): Promise<DicomStoreResult> {
    const response = await fetch(this.options.gatewayUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/dicom",
        ...(this.options.accessToken
          ? { Authorization: `Bearer ${this.options.accessToken}` }
          : {})
      },
      body: instance.bytes
    });

    return {
      ok: response.ok,
      statusCode: response.status,
      studyInstanceUid: instance.studyInstanceUid,
      sopInstanceUid: instance.sopInstanceUid,
      message: response.ok ? "Queued DICOM instance for gateway storage." : await response.text()
    };
  }
}
