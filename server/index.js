import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

app.post("/api/terrasuck", async (req, res) => {
    try {
        const { input, model, systemPrompt } = req.body;

        // Model Mapping for NEXORA Custom Tiers
        let targetModel = "gpt-4o";
        if (model === "gpt-4.1-mini") targetModel = "gpt-4o-mini";
        else if (model === "gpt-4.1") targetModel = "gpt-4o";
        else if (model === "o4-mini") targetModel = "gpt-4o";
        else if (model === "GPT-5") targetModel = "gpt-4o";
        else if (model === "GPT-5.2") targetModel = "gpt-4o";
        else targetModel = model || "gpt-4o";

        const completion = await openai.chat.completions.create({
            model: targetModel,
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
        const list = await openai.models.list();
        res.json(list);
    } catch (err) {
        console.error("Error fetching models:", err);
        res.status(500).json({ error: "Failed to fetch models" });
    }
});

app.listen(3001, () =>
    console.log("nexora server running on :3001 (OpenAI)")
);
