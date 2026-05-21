# web-dicom-export

Export a browser report view to a DICOM Encapsulated PDF and store it to PACS.

This repository currently contains an architecture decision record and a TypeScript skeleton for the browser-first workflow described in [ADR 0001](docs/adr/0001-print-web-page-to-dicom-encapsulated-pdf.md).

## Goal

The intended user flow is:

1. A user presses `Save to PACS` on the SenoGram page.
2. The browser gathers minimum patient metadata and report state.
3. The browser creates a deterministic PDF report.
4. The PDF is wrapped in a DICOM Encapsulated PDF instance.
5. The instance is stored using DICOMweb STOW-RS, or sent to a gateway that performs DIMSE C-STORE.

## Project Structure

```text
docs/
  adr/
    0001-print-web-page-to-dicom-encapsulated-pdf.md
  setup.md
  testing.md
src/
  browser/
    saveToPacsButton.ts
  gateway/
    gatewayContract.ts
  dicomEncapsulatedPdf.ts
  exportWorkflow.ts
  reportPdf.ts
  storage.ts
  types.ts
  uids.ts
test/
  uids.test.ts
```

## Setup

See [setup notes](docs/setup.md).

```powershell
npm install
npm run build
```

## Tests

See [test instructions](docs/testing.md).

```powershell
npm test
```

## Current Status

This is a skeleton implementation. It defines the interfaces and workflow boundaries for:

- report PDF rendering
- DICOM Encapsulated PDF creation
- DICOMweb STOW-RS storage
- gateway-based DIMSE C-STORE storage
- browser button integration

The DICOM PS3.10 serialization step is intentionally left behind an interface in `DcmjsEncapsulatedPdfDicomBuilder` until the target PACS conformance requirements are confirmed.

## Credits
SenoGram is a registered trademark of www.senomedical.com.
Developed with assistance from OpenAI Codex.
