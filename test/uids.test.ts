import { describe, expect, it } from "vitest";
import { createDicomUid, isValidDicomUid } from "../src/uids";

describe("DICOM UID helpers", () => {
  it("creates syntactically valid DICOM UIDs", () => {
    const uid = createDicomUid();

    expect(isValidDicomUid(uid)).toBe(true);
  });

  it("rejects non-numeric UID components", () => {
    expect(isValidDicomUid("1.2.bad.4")).toBe(false);
  });
});
