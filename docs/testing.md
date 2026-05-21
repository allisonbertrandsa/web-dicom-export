# Test Instructions

## Unit Tests

Install dependencies, then run:

```powershell
npm test
```

The initial test coverage validates the DICOM UID helper shape.

## Build Check

```powershell
npm run build
```

Use this as the primary check while the project is still an interface skeleton.

## Manual Integration Test Plan

1. Render a SenoGram report state in a controlled browser test page.
2. Press `Save to PACS`.
3. Confirm the browser generates a PDF with:
   - patient ID
   - patient name
   - patient birth date
   - report/scoring summary
   - source URL
   - export timestamp
4. Confirm generated DICOM metadata includes:
   - Encapsulated PDF Storage SOP Class UID
   - PatientID
   - PatientName
   - PatientBirthDate
   - StudyInstanceUID
   - SeriesInstanceUID
   - SOPInstanceUID
   - MIMETypeOfEncapsulatedDocument = `application/pdf`
5. For DICOMweb:
   - POST the instance with STOW-RS.
   - Verify the PACS returns success.
   - Query/retrieve the study and confirm the Encapsulated PDF is present.
6. For gateway:
   - POST the instance to the gateway.
   - Verify gateway C-STORE success.
   - Query/retrieve the study and confirm the Encapsulated PDF is present.

## PACS Conformance Checks

Before production testing, confirm:

- The PACS accepts Encapsulated PDF Storage.
- The PACS accepts the chosen transfer syntax.
- The PACS can display or route the stored PDF as expected.
- Study attachment behavior is clear when using an existing `StudyInstanceUID`.
- Required site-specific fields are populated.
