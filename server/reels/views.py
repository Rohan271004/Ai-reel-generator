from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .ai import generate_reel_script
from .models import ReelScript


def home(request):
    return JsonResponse({"message": "AI Reel Generator Backend Running"})


@csrf_exempt
def generate_script(request):
    if request.method == "POST":
        try:
            print("REQUEST RECEIVED")

            data = json.loads(request.body)

            topic = data.get("topic")
            niche = data.get("niche")
            platform = data.get("platform")
            style = data.get("style")

            print(topic, niche, platform, style)

            result = generate_reel_script(topic, niche, platform, style)

            print("AI RESULT:", result)

            ReelScript.objects.create(
                topic=topic,
                niche=niche,
                platform=platform,
                style=style,
                title=result.get("title", ""),
                hook=result.get("hook", ""),
                script=result.get("script", ""),
                cta=result.get("cta", ""),
                hashtags=result.get("hashtags", ""),
            )

            return JsonResponse(result)

        except Exception as e:
            print("ERROR:", str(e))
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"message": "Only POST allowed"})


def my_scripts(request):
    scripts = ReelScript.objects.all().order_by("-id")

    data = list(scripts.values())

    return JsonResponse(data, safe=False)
