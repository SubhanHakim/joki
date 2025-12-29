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

// Single Model Focus: The Real GPT-5.2
const TARGET_MODEL = "gpt-5.2";

const handleTerrasuck = async (req, res) => {
    try {
        let { input, image, systemPrompt } = req.body;

        // --- 🎨 IMAGE GENERATION MODE ---
        if (input && typeof input === 'string' && input.trim().toLowerCase().startsWith("/image")) {
            const prompt = input.replace(/^\/image\s*/i, "");

            if (!prompt) return res.json({ output: "Please provide a description. Example: /image cyberpunk city" });

            const response = await client.images.generate({
                model: "dall-e-3",
                prompt: prompt,
                n: 1,
                size: "1024x1024",
            });

            const imageUrl = response.data[0].url;
            return res.json({
                model_used: "dall-e-3",
                output: `![Generated Art](${imageUrl})`
            });
        }

        // --- 💬 STANDARD CHAT/VISION MODE ---
        let userContent = [{ type: "text", text: input }];

        if (image) {
            userContent.push({
                type: "image_url",
                image_url: {
                    url: image, // Base64 Data URL
                    detail: "auto"
                }
            });
        }

        // Use 'input' string directly if no image (legacy compatibility), or array if image exists
        const finalUserMessage = image ? userContent : input;

        // Use gpt-4o for Vision tasks to ensure compatibility, gpt-5.2 for pure text intelligence
        const activeModel = image ? "gpt-4o" : TARGET_MODEL;

        // Tool Definitions
        const tools = [
            {
                type: "function",
                function: {
                    name: "generate_image",
                    description: "Generate an image/art/logo based on user description. Use this whenever user asks to create, generate, draw, or make a visual image.",
                    parameters: {
                        type: "object",
                        properties: {
                            prompt: {
                                type: "string",
                                description: "The detailed prompt for DALL-E 3. IMPORTANT: If generating a logo, icon, or symbol, ALWAYS specify 'flat vector design, minimal, white background, no mockup, no realistic render, no text on wall'. For other art, use high-quality artistic descriptors."
                            }
                        },
                        required: ["prompt"]
                    }
                }
            }
        ];

        const completion = await client.chat.completions.create({
            model: activeModel,
            messages: [
                {
                    role: "system",
                    content: systemPrompt || "You are NEXORA. Extraction-oriented AI agent. Running on GPT-5.2 Core."
                },
                { role: "user", content: finalUserMessage }
            ],
            tools: tools,
            tool_choice: "auto",
            temperature: 0.7,
        });

        const responseMessage = completion.choices[0].message;

        // CHECK IF AI WANTS TO GENERATE IMAGE
        if (responseMessage.tool_calls) {
            const toolCall = responseMessage.tool_calls[0];
            if (toolCall.function.name === "generate_image") {
                const toolArgs = JSON.parse(toolCall.function.arguments);
                const imagePrompt = toolArgs.prompt;

                // Call DALL-E 3
                const imageResponse = await client.images.generate({
                    model: "dall-e-3",
                    prompt: imagePrompt,
                    n: 1,
                    size: "1024x1024",
                });

                const imageUrl = imageResponse.data[0].url;
                return res.json({
                    model_used: "dall-e-3",
                    output: `![Generated Art](${imageUrl})\n\n**NEXORA:** Vision created based on prompt: _"${imagePrompt}"_`
                });
            }
        }

        // If no tool called...
        res.json({ output: responseMessage.content });
    } catch (error) {
        console.error("API Error:", error);
        res.status(500).json({ error: "Agent failure" });
    }
};

app.post("/api/terrasuck", handleTerrasuck);
app.post("/terrasuck", handleTerrasuck);

app.get("/api", (_, res) => {
    res.send("Terrasuck Backend Operational (GPT-5.2 Mode)");
});

export default app;
