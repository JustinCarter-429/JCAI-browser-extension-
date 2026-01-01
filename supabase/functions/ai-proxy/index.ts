import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const HF_API_URL = "https://router.huggingface.co/v1/chat/completions";
const HF_MODEL_ID = "Qwen/Qwen2.5-Coder-7B-Instruct";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

serve(async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ success: false, error: "Method not allowed" }),
      { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }

  try {
    const hfApiKey = Deno.env.get("HF_API_KEY");
    if (!hfApiKey) {
      return new Response(
        JSON.stringify({ success: false, error: "HF_API_KEY not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const body = await req.json() as { prompt?: string };
    const prompt = body?.prompt;

    if (!prompt || typeof prompt !== "string") {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid or missing prompt" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const hfResponse = await fetch(HF_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${hfApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: HF_MODEL_ID,
        messages: [
          { role: "system", content: "You are a concise coding and writing assistant." },
          { role: "user", content: prompt },
        ],
        max_tokens: 512,
        temperature: 0.7,
      }),
    });

    const rawText = await hfResponse.text();

    let data: unknown;
    try {
      data = JSON.parse(rawText);
    } catch (_) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid JSON from Hugging Face", data: rawText }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    if (!hfResponse.ok) {
      return new Response(
        JSON.stringify({ success: false, error: `Hugging Face API error: ${hfResponse.status}`, data }),
        { status: hfResponse.status, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    let text = "";
    if (typeof data === "object" && data !== null && Array.isArray((data as { choices?: unknown }).choices)) {
      const choice = (data as { choices: Array<{ message?: { content?: string } } | null> }).choices[0];
      text = choice?.message?.content ?? "";
    }

    if (!text) {
      text = typeof data === "string" ? data : JSON.stringify(data);
    }

    return new Response(
      JSON.stringify({ success: true, text }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal server error";
    return new Response(
      JSON.stringify({ success: false, error: message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});