# Sophiie AI Agents Hackathon 2026

### Participant

| Field                     | Your Answer                     |
| ------------------------- | ------------------------------- |
| **Name**                  | Pragnya Seelin                  |
| **University / Employer** | University of Technology Sydney |

### Project

| Field                    | Your Answer                                                                                                  |
| ------------------------ | ------------------------------------------------------------------------------------------------------------ |
| **Project Name**         | Sophiie Canvas                                                                                               |
| **One-Line Description** | A generative multimodal interface that replaces static dashboards with real-time, tool-driven UI components. |
| **Demo Video Link**      |                                                                                                              |
| **Tech Stack**           | Next.js 16, React 19, Tailwind CSS 4, Framer Motion, Vercel AI SDK                                           |
| **AI Provider(s) Used**  | Google Gemini 2.0 Flash                                                                                      |

### About Your Project

#### What does it do?

Sophiie Canvas is a rethinking of the traditional business dashboard. Instead of forcing users to navigate complex menus and static charts, it uses a Generative UI approach. The agent understands user intent and dynamically "assembles" the interface in real-time.

#### How does the interaction work?

The user interacts via a clean, minimal chat interface on the left. As the user asks for insights (e.g., "Show me our revenue growth"), the agent doesn't just reply with text. It triggers Agentic Tool Calls that must render React components (Metric Cards, Charts, Tables) on a dynamic "Canvas" to the right.

#### What makes it special?

Instead of a standard "chatbot," it is a Tool-Native Orchestrator. The logic is designed so that the AI can seamlessly transition from text to a visual widget without breaking the user's flow but the version mismatches are preventing the final testing.

This is my first time building an Agent and I have vibe-coded the project but there are lot of takeaways and new things I learned -

1. Setting up the Next js starter code.
2. Using the API key
3. Following best-practices like having a .env.example
4. How local and global installations affect the project

#### How to run it

<!-- Step-by-step instructions to set up and run your project locally -->

```bash
# Clone the forked repository
git clone https://github.com/[your-username]/hackathon.git
cd hackathon

# Install dependencies
npm install

# Setup Environment Variables
# Create a .env.local file and add:
# GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key

# Run the development server
npm run dev

# Open http://localhost:3000 in your browser
```
