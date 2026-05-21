# Setup Notes

## Prerequisites

- Node.js 20 or newer.
- npm 10 or newer.
- A target PACS integration path:
  - DICOMweb STOW-RS endpoint, or
  - gateway service capable of DIMSE C-STORE.

## Install

```powershell
npm install
```

## Build Check

```powershell
npm run build
```

## Configuration

For direct browser-to-DICOMweb storage, configure:

- STOW-RS base URL, for example `https://pacs.example.org/dicomweb`
- access token or other authorization mechanism
- CORS policy allowing the SenoGram application origin
- PACS support for Encapsulated PDF Storage

For gateway storage, configure the gateway with:

- called AE title
- calling AE title
- PACS host
- PACS port
- any TLS/VPN/network allow-list requirements
- storage retry and audit policy

## Current Skeleton Boundaries

The code currently defines the workflow boundaries and a basic PDF renderer. DICOM PS3.10 serialization is intentionally left as a TODO behind `DcmjsEncapsulatedPdfDicomBuilder`, because the exact dcmjs mapping and PACS conformance profile should be validated against the target PACS.
