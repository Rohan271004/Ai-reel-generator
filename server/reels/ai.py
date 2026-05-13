import os
import json
from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))


def fallback_response(topic, niche, platform, style):
    return {
        "title": f"{style} {topic} Reel Idea",
        "hook": f"If you're into {niche}, this {platform} hack will change everything!",
        "script": f"""
Today we talk about {topic}.

If you're in the {niche} niche, this is for you.

This {style} style reel is perfect for {platform}.

Start strong, keep energy high, and deliver value.
        """.strip(),
        "cta": "Follow for more amazing content!",
        "hashtags": f"#{topic.replace(' ', '')} #{niche.replace(' ', '')} #{platform.replace(' ', '')} #{style}",
    }


def generate_reel_script(topic, niche, platform, style):
    try:
        prompt = f"""
Create a viral reel script.

Topic: {topic}
Niche: {niche}
Platform: {platform}
Style: {style}

Return ONLY valid JSON:
{{
  "title": "",
  "hook": "",
  "script": "",
  "cta": "",
  "hashtags": ""
}}
"""

        response = client.models.generate_content(
            model="gemini-2.0-flash", contents=prompt
        )

        text = response.text.strip()

        text = text.replace("```json", "").replace("```", "")

        return json.loads(text)

    except Exception as e:
        # 🔥 IMPORTANT: fallback if quota/API fails
        return fallback_response(topic, niche, platform, style)
