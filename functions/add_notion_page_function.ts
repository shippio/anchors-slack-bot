import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";
import { Client } from "https://deno.land/x/notion_sdk/src/mod.ts";

export const AddNotionPageFunctionDefinition = DefineFunction({
  callback_id: "add_notion_page_function",
  title: "Add Notion Page",
  description: "Add a page to a Notion database",
  source_file: "functions/add_notion_page_function.ts",
  input_parameters: {
    properties: {
      title: {
        type: Schema.types.string,
        description: "Title",
      },
      responder: {
        type: Schema.types.string,
        description: "Tech support responder",
      },
      incident: {
        type: Schema.types.string,
        description: "Summary of the incident",
      },
      cause: {
        type: Schema.types.string,
        description: "SUmmary of the cause",
      },
      response: {
        type: Schema.types.string,
        description: "Summary of your response",
      },
      link: {
        type: Schema.types.string,
        description: "The link to the slack thread",
      },
    },
    required: ["title", "responder", "incident", "cause", "response", "link"],
  },
  // TODO: Later, add a success message
  // output_parameters: {
  //   properties: {
  //     success_message: {
  //       type: Schema.types.string,
  //       description: "Success message after Notion page is created",
  //     },
  //   },
  //   required: ["success_message"],
  // },
});

export default SlackFunction(
  AddNotionPageFunctionDefinition,
  async ({ env, inputs }) => {
    const notion = new Client({ auth: env["NOTION_API_KEY"] });
    const databaseId = env["NOTION_DATABASE_ID"];

    try {
      const response = await notion.pages.create({
        parent: {
          database_id: databaseId,
        },
        properties: {
          title: {
            title: [
              {
                "text": {
                  "content": inputs.title,
                },
              },
            ],
          },
          Responder: {
            rich_text: [
              {
                "text": {
                  "content": inputs.responder,
                },
              },
            ],
          },
          "Slack Link": {
            rich_text: [
              {
                "text": {
                  "content": inputs.link,
                },
              },
            ],
          },
        },
        children: [
          {
            object: "block",
            heading_2: {
              rich_text: [
                {
                  text: {
                    content: "Incident Summary",
                  },
                },
              ],
            },
          },
          {
            object: "block",
            paragraph: {
              rich_text: [
                {
                  text: {
                    content: inputs.incident,
                  },
                },
              ],
            },
          },
          {
            object: "block",
            heading_2: {
              rich_text: [
                {
                  text: {
                    content: "Cause Summary",
                  },
                },
              ],
            },
          },
          {
            object: "block",
            paragraph: {
              rich_text: [
                {
                  text: {
                    content: inputs.cause,
                  },
                },
              ],
            },
          },
          {
            object: "block",
            heading_2: {
              rich_text: [
                {
                  text: {
                    content: "Response Summary",
                  },
                },
              ],
            },
          },
          {
            object: "block",
            paragraph: {
              rich_text: [
                {
                  text: {
                    content: inputs.response,
                  },
                },
              ],
            },
          },
        ],
      });

      console.log(response);
      console.log("Success! Entry added.");
    } catch (error) {
      console.error(error);
    }
    return { outputs: {} };
  },
);
