const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const handler = async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { age, gender, goal, tipTitle, type = "generate" } = await req.json();
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

    if (!GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not configured");
    }

    let prompt = "";
    
    if (type === "generate") {
      // Generate 5 wellness tips
      const goalDescriptions: Record<string, string> = {
        "weight-loss": "weight loss and healthy body composition",
        "stress-relief": "stress reduction and relaxation",
        "better-sleep": "improved sleep quality and restful nights",
        "energy-boost": "increased energy and vitality",
        "fitness": "improved fitness and physical strength",
        "mental-clarity": "enhanced mental clarity and focus",
      };

      prompt = `Generate exactly 5 concise, actionable wellness tips for a ${age}-year-old ${gender} aiming for ${goalDescriptions[goal] || goal}.

For each tip, provide:
1. A short, catchy title (max 6 words)
2. A one-sentence summary (max 15 words)
3. A relevant emoji icon that represents the tip

Format your response as a JSON array with this exact structure:
[
  {
    "title": "Tip title here",
    "summary": "Brief one-sentence description",
    "icon": "relevant emoji"
  }
]

Make the tips practical, supportive, and motivational. Focus on actionable advice.`;
    } else if (type === "details") {
      // Expand on a specific tip
      prompt = `Provide detailed information about the wellness tip: "${tipTitle}"

Include:
1. A detailed explanation (2-3 paragraphs) of why this tip is beneficial and how it works
2. A practical 3-5 step action plan with specific, daily steps the user can take

Format your response as JSON:
{
  "details": "Detailed explanation here...",
  "actionPlan": [
    "Step 1: Specific action",
    "Step 2: Specific action",
    "Step 3: Specific action"
  ]
}

Make it supportive, encouraging, and easy to follow.`;
    }

    console.log("Calling Gemini AI with prompt:", prompt);

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          system_instruction: {
            parts: {
              text: "You are a supportive wellness coach. Provide practical, evidence-based health advice in a motivational and caring tone. Always respond with valid JSON only, no markdown formatting.",
            },
          },
          contents: {
            parts: {
              text: prompt,
            },
          },
          generationConfig: {
            temperature: 0.8,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini AI error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      if (response.status === 402 || response.status === 403) {
        return new Response(
          JSON.stringify({ error: "API key invalid or quota exceeded. Please check your Gemini API key." }),
          { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.candidates[0].content.parts[0].text;
    
    console.log("AI response:", content);

    // Parse the JSON response
    let parsedContent;
    try {
      // Remove markdown code blocks if present
      const cleanContent = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      parsedContent = JSON.parse(cleanContent);
    } catch (e) {
      console.error("Failed to parse AI response:", e, "Content:", content);
      throw new Error("Invalid response format from AI");
    }

    return new Response(JSON.stringify(parsedContent), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in generate-wellness-tips:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "An unexpected error occurred" 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
};

export default handler;
