import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

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

export default async function handler(req, res) {
    // 1. Validasi Method
    if (req.method !== 'POST') {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        // 2. Parsed Input
        const { message, mode } = req.body;

        if (!message || typeof message !== 'string') {
            return res.status(400).json({ error: "Message is required and must be a string." });
        }

        // 3. Mode Selection (Default: project)
        const selectedMode = mode && SYSTEM_PROMPTS[mode] ? mode : 'project';
        const systemInstruction = SYSTEM_PROMPTS[selectedMode];

        // 4. OpenAI Call (Stateless)
        const completion = await client.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { role: "system", content: systemInstruction },
                { role: "user", content: message }
            ],
            temperature: 0.7,
            max_tokens: 1500, // Cost control
        });

        const aiResponse = completion.choices[0].message.content;

        // 5. Standardized Response
        return res.status(200).json({
            result: aiResponse
        });

    } catch (error) {
        console.error("Server Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
