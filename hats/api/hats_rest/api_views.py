from common.json import ModelEncoder
from .models import Hat, LocationVO
from django.views.decorators.http import require_http_methods
import json
from django.http import JsonResponse

class LocationVODetailEncoder(ModelEncoder):
    model = LocationVO
    properties = [
        "closet_name",
        "section_number",
        "shelf_number",
        "import_href",
    ]


class HatListEncoder(ModelEncoder):
    model = Hat
    properties = [
        "style_name", "id"
        ]

class HatDetailEncoder(ModelEncoder):
    model = Hat
    properties= [
        "fabric",
        "style_name",
        "color",
        "picture_url",
        "location",
        "id",
    ]
    encoders = {
        "location" : LocationVODetailEncoder(),
    }


@require_http_methods(["GET", "POST"])
def api_list_hats(request, location_vo_id=None):
    if request.method == "GET":
        if location_vo_id is not None:
            hats = Hat.objects.filter(location=location_vo_id)
        else :
            hats = Hat.objects.all()
        return JsonResponse(
            {"hats": hats},
            encoder=HatListEncoder,
        )
    else:
        content = json.loads(request.body)

        try:
            location_href = content["location"]
            location = LocationVO.objects.get(import_href=location_href)

            content["location"] = location

        except LocationVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid location id"},
                status=400,
            )

        hat = Hat.objects.create(**content)
        return JsonResponse(
            hat,
            encoder=HatDetailEncoder,
            safe=False,
        )

# @require_http_methods({"GET", "POST"})
# def api_list_hats(request):
#     if request.method == "GET":
#         hats = Hat.object.all()
#         return JsonResponse(
#             {"hats": hats},
#             encoder=HatListEncoder
#         )

#     else:
#         content = json.loads(request.body)

#         try:
#             locations = LocationVO.objects.get(import_href=content["location"])
#             content["location"] = locations
#         except LocationVO.DoesNotExist:
#             return JsonResponse(
#                 {"message": "Invalid location name"},
#                 status=400,
#             )
#         hat = Hat.objects.create(**content)
#         return JsonResponse(
#             hat,
#             encoder=HatDetailEncoder,
#             safe=False,
#         )
@require_http_methods(["DELETE", "GET", "PUT"])
def api_show_hat(request, pk):
    if request.method == "GET":
        hat = Hat.objects.get(id=pk)
        return JsonResponse(
            hat,
            encoder=HatDetailEncoder,
            safe=False,
        )
    elif request.method == "DELETE":
        count, _ = Hat.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})
    else:
        content = json.loads(request.body)
        try:
            if "location" in content:
                location = LocationVO.objects.get(import_href=content["location"])
                content["location"] = location
        except LocationVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid location id"},
                status=400,
            )

        Hat.objects.filter(id=pk).update(**content)

        hat = Hat.objects.get(id=pk)
        return JsonResponse(
            hat,
            encoder=HatDetailEncoder,
            safe=False,
        )
