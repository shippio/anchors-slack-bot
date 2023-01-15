import { Trigger } from "deno-slack-api/types.ts";
import RecordingWorkflow from "../workflows/recording_workflow.ts";

/**
 * Triggers determine when Workflows are executed. A trigger
 * file describes a scenario in which a workflow should be run,
 * such as a user pressing a button or when a specific event occurs.
 * https://api.slack.com/future/triggers
 */
const recordingTrigger: Trigger<typeof RecordingWorkflow.definition> = {
  type: "shortcut",
  name: "Display a form",
  description: "Display a form to record a tech support response",
  workflow: "#/workflows/recording_workflow",
  inputs: {
    interactivity: {
      value: "{{data.interactivity}}",
    },
  },
};

export default recordingTrigger;
