import { Manifest } from "deno-slack-sdk/mod.ts";
import RecodingWorkflow from "./workflows/recording_workflow.ts";

/**
 * The app manifest contains the app's configuration. This
 * file defines attributes like app name and description.
 * https://api.slack.com/future/manifest
 */
export default Manifest({
  name: "tech-support-recorder",
  description:
    "A slack application to record tech support responses from Slack form to Notion.",
  // TODO: Replace the icon.
  icon: "assets/default_new_app_icon.png",
  workflows: [RecodingWorkflow],
  outgoingDomains: [],
  botScopes: ["commands", "chat:write", "chat:write.public"],
});
