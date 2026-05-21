export interface GatewayStoreRequest {
  contentType: "application/dicom";
  body: Uint8Array;
}

export interface GatewayPacsConfig {
  calledAeTitle: string;
  callingAeTitle: string;
  host: string;
  port: number;
}

export interface GatewayStoreResponse {
  ok: boolean;
  status: string;
  pacsMessage?: string;
}

export interface DimseStoreSender {
  cStore(request: GatewayStoreRequest, pacs: GatewayPacsConfig): Promise<GatewayStoreResponse>;
}
