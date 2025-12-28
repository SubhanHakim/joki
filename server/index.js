import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

app.post("/api/terrasuck", async (req, res) => {
    try {
        const { input, model, systemPrompt } = req.body;

        const completion = await groq.chat.completions.create({
            model: model || "llama-3.3-70b-versatile",
            temperature: 0.2,
            messages: [
                {
                    role: "system",
                    content: systemPrompt || `You are NEXORA. Extraction-oriented AI agent. Cold. Minimal. System-grade. No emojis. No politeness.`
                },
                { role: "user", content: input }
            ],
        });

        res.json({
            output: completion.choices[0].message.content
        });

    } catch (err) {
        console.error("Error processing request:", err);
        res.status(500).json({ error: "Agent failure" });
    }
});

app.get("/api/models", async (req, res) => {
    try {
        const response = await fetch("https://api.groq.com/openai/v1/models", {
            headers: {
                "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        res.json(data);
    } catch (err) {
        console.error("Error fetching models:", err);
        res.status(500).json({ error: "Failed to fetch models" });
    }
});

app.listen(3001, () =>
    console.log("nexora server running on :3001")
);
