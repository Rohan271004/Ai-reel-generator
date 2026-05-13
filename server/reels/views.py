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
            data = json.loads(request.body)

            topic = data.get("topic")
            niche = data.get("niche")
            platform = data.get("platform")
            style = data.get("style")

            result = generate_reel_script(topic, niche, platform, style)

            # save to DB
            ReelScript.objects.create(
                topic=topic,
                niche=niche,
                platform=platform,
                style=style,
                title=result["title"],
                hook=result["hook"],
                script=result["script"],
                cta=result["cta"],
                hashtags=result["hashtags"],
            )

            return JsonResponse(result)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"message": "Only POST allowed"})


def my_scripts(request):
    scripts = ReelScript.objects.all().order_by("-id")

    data = list(scripts.values())

    return JsonResponse(data, safe=False)
