# AI Utility Chatbot

This project is an AI-based utility chatbot designed to help users transform ideas into ready-to-use output.
Unlike general chatbots that function for free-form conversation, this chatbot is focused on practical and structured tasks.

It uses the **OpenAI API** as its artificial intelligence engine, with logic and full control on the backend side, ensuring the responses generated are directive, consistent, and relevant to user needs.

## 🎯 Main Goal

The primary goal of this project is to provide a practical, fast, and accessible AI assistant to:

*   Draft project ideas
*   Create professional content
*   Refine and optimize AI prompts

**Users can use the chatbot immediately without logging in; simply open the application and start interacting.**

## 🧠 Core Functions

The chatbot features several utility-based working modes, including:

### 1. Project Assistant
Helps users structure project concepts, starting from naming, descriptions, key features, to actionable next steps.

### 2. Content & Copy Assistant
Generates professional text such as project descriptions, announcements, or ready-to-publish content with polished and structured language.

### 3. Prompt Engineer Assistant
Assists users in refining and optimizing AI prompts to produce more consistent and high-quality outputs.

Each mode is designed so the chatbot avoids general answers and instead directly produces usable output.

## 🛠️ How It Works

1.  User sends a message via the **React** interface.
2.  The message is forwarded to the backend via the internal API (`/api/chat`).
3.  The backend processes the request with a specific system prompt based on the selected mode.
4.  The OpenAI API generates a response based on that context.
5.  The result is returned to the user in a neat, ready-to-use format.

## 🚀 Project Characteristics

*   **No login or account required**
*   **Utility-focused**, not free-form conversation
*   **Secure** (API key stored on the server)
*   **Easy to extend** and integrate
*   **Suitable for MVP**, demos, or real-world usage

## 🧩 Summary

In short, this project is an AI-based chatbot assistant acting as a productivity tool, specifically designed to help users build ideas, content, and AI prompts faster, more structured, and more efficiently.

---

### Tech Stack

*   **Frontend**: React, TypeScript, Vite, Tailwind CSS
*   **Backend**: Node.js, Express
*   **AI**: OpenAI API
