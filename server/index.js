import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Utility Modes System Prompts
const SYSTEM_PROMPTS = {
    project: `You are an AI Project Assistant focused on structure and clarity.
    Task: Help the user draft ideas, roadmaps, technical stacks, and project features.
    Style: Direct, structured (use bullet points/markdown), professional.
    Goal: Transform abstract ideas into concrete, actionable plans.`,

    content: `You are a professional AI Content & Copywriter.
    Task: Write marketing content, product descriptions, or technical articles.
    Style: Engaging, persuasive, grammatically correct, tailored to the target audience.
    Goal: Produce ready-to-publish text.`,

    prompt: `You are an AI Prompt Engineer Expert.
    Task: Analyze and optimize user prompts for LLMs.
    Method: Use techniques like Chain-of-Thought (CoT), Few-Shot, or Role-Playing.
    Goal: Provide a significantly improved version of the prompt and explain the improvements made.`
};

app.post("/api/chat", async (req, res) => {
    try {
        const { message, mode } = req.body;

        // 1. Validation
        if (!message || typeof message !== 'string') {
            const errorMsg = "Message is required and must be a string.";
            console.error("API Error: ", errorMsg);
            return res.status(400).json({ error: errorMsg });
        }

        // 2. Mode Selection
        // Strict mode selection based on allowed keys
        const selectedMode = (mode && SYSTEM_PROMPTS[mode]) ? mode : 'project';
        const systemInstruction = SYSTEM_PROMPTS[selectedMode];

        console.log(`Processing Request - Mode: ${selectedMode}`);

        // 3. OpenAI Call
        const completion = await client.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { role: "system", content: systemInstruction },
                { role: "user", content: message } // Send message directly as content
            ],
            temperature: 0.7,
            max_tokens: 1500,
        });

        const aiResponse = completion.choices[0].message.content;

        // 4. Response
        res.json({ result: aiResponse });

    } catch (error) {
        console.error("API Error:", error);
        res.status(500).json({ error: "Agent failure" });
    }
});

// Vercel-like legacy endpoint support (optional or deprecated)
app.post("/api/terrasuck", (req, res) => {
    res.status(410).json({ error: "Endpoint deprecated. Use /api/chat." });
});

app.listen(3001, () =>
    console.log("AI Utility Backend running on :3001")
);

export default app;
