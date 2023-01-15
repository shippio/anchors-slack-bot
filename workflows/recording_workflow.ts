import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";

/**
 * A Workflow is a set of steps that are executed in order.
 * Each step in a Workflow is a function.
 * https://api.slack.com/future/workflows
 */
const RecordingWorkflow = DefineWorkflow({
  callback_id: "recording_workflow",
  title: "Record a tech support response",
  description: "Record a tech support response to Notion",
  input_parameters: {
    properties: {
      interactivity: {
        type: Schema.slack.types.interactivity,
      },
    },
    required: ["interactivity"],
  },
});

/**
 * Built-in OpenForm function as a first step for collecting input from users.
 * https://api.slack.com/future/functions#open-a-form
 */
const _inputForm = RecordingWorkflow.addStep(
  Schema.slack.functions.OpenForm,
  {
    title: "Record your response",
    interactivity: RecordingWorkflow.inputs.interactivity,
    submit_label: "Send recording",
    fields: {
      elements: [{
        name: "title",
        title: "Title",
        type: Schema.types.string,
      }, {
        name: "responder",
        title: "Who responded?",
        type: Schema.slack.types.user_id,
      }, {
        name: "incident",
        title: "Summary of the incident",
        type: Schema.types.string,
        long: true,
      }, {
        name: "cause",
        title: "Summary of the cause",
        type: Schema.types.string,
        long: true,
      }, {
        name: "response",
        title: "Summary of your response",
        type: Schema.types.string,
        long: true,
      }, {
        name: "link",
        title: "A link to the thread",
        type: Schema.types.string,
      }],
      required: ["title", "responder", "incident", "cause", "response", "link"],
    },
  },
);

export default RecordingWorkflow;
