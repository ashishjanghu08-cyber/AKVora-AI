import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const {
      type,
      business,
      product,
      audience,
      tone
    } = req.body || {};

    if (!product) {
      return res.status(400).json({
        error: "Please enter product or service details."
      });
    }

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const prompt = `
You are AKVora AI, a professional AI marketing assistant.

Create high-quality marketing content for the user.

Content type: ${type || "Marketing content"}
Business/Brand: ${business || "Not provided"}
Product/Service: ${product}
Target audience: ${audience || "General audience"}
Tone: ${tone || "Professional"}

Make the output practical, engaging and ready to use.
Do not add unnecessary explanations.
`;

    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
      input: prompt
    });

    return res.status(200).json({
      result: response.output_text
    });

  } catch (error) {
    return res.status(500).json({
      error: error?.message || "AI generation failed."
    });
  }
}
