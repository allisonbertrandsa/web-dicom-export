import type { ExportWorkflow } from "../exportWorkflow";
import type { SenoGramReportState } from "../types";

export interface SaveToPacsButtonOptions {
  button: HTMLButtonElement;
  getReportState: () => SenoGramReportState;
  workflow: ExportWorkflow;
  onSuccess?: (message: string) => void;
  onError?: (error: unknown) => void;
}

export function attachSaveToPacsButton(options: SaveToPacsButtonOptions): void {
  options.button.addEventListener("click", async () => {
    options.button.disabled = true;

    try {
      const result = await options.workflow.exportToPacs(options.getReportState());
      if (!result.ok) {
        throw new Error(result.message);
      }

      options.onSuccess?.(result.message);
    } catch (error) {
      options.onError?.(error);
    } finally {
      options.button.disabled = false;
    }
  });
}
