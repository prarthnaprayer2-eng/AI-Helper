// AI API calling utility
export async function callAI(prompt, systemPrompt = "You are a helpful AI assistant for college students. Be concise and practical.") {
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        system: systemPrompt,
        messages: [{ role: "user", content: prompt }]
      })
    });
    const data = await res.json();
    return data.content?.[0]?.text || "No response received.";
  } catch (e) {
    return "AI unavailable. Please check your connection.";
  }
}
