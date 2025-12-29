import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Single Model Focus: The Real GPT-5.2
const TARGET_MODEL = "gpt-5.2";

app.post("/api/terrasuck", async (req, res) => {
    try {
        const { input, systemPrompt } = req.body;

        const completion = await client.chat.completions.create({
            model: TARGET_MODEL,
            messages: [
                {
                    role: "system",
                    content: systemPrompt || "You are NEXORA. Extraction-oriented AI agent. Cold. Minimal. System-grade. Running on GPT-5.2 Core."
                },
                { role: "user", content: input }
            ],
            temperature: 0.2
        });

        res.json({
            model_used: "gpt-5.2",
            output: completion.choices[0].message.content
        });

    } catch (err) {
        console.error("API Error:", err);
        res.status(500).json({ error: "Agent failure" });
    }
});

app.listen(3001, () =>
    console.log("NEXORA server running on :3001 (GPT-5.2 Mode)")
);
