// CHANGE 1: Swapped '@ai-sdk/openai' for '@ai-sdk/google'
import { google } from "@ai-sdk/google";
import { streamText, tool } from "ai";
import { z } from "zod";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    // CHANGE 2: Updated model to Gemini.
    // 'gemini-2.0-flash' is free-tier friendly and very fast.
    model: google("gemini-2.0-flash"),
    messages,
    maxSteps: 5,
    system: `You are the Sophiie Canvas Agent. Your job is to help users visualize business data.
             When asked for metrics, growth, or charts, use the provided tools.
             Always provide a brief text explanation after calling a tool.`,
    tools: {
      show_metric: tool({
        description: "Display a single key performance indicator (KPI) card.",
        parameters: z.object({
          title: z.string().describe("The name of the metric"),
          value: z.string().describe('The value to display (e.g. "$50k")'),
          trend: z.number().describe("Percentage change, e.g. 10 or -5"),
        }),
        execute: async (args) => {
          return args;
        },
      }),
      show_chart: tool({
        description: "Display a bar or line chart for data trends.",
        parameters: z.object({
          title: z.string(),
          type: z.enum(["bar", "line"]),
          data: z.array(z.object({ name: z.string(), value: z.number() })),
        }),
        execute: async (args) => args,
      }),
    },
  });

  return result.toDataStreamResponse();
}
