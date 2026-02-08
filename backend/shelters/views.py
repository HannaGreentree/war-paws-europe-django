from django.shortcuts import render
from django.db.models import Q
from .models import Shelter

def shelter_list(request):
    q = request.GET.get("q", "").strip()
    country = request.GET.get("country", "").strip()
    org_type = request.GET.get("org_type", "").strip()

    shelters = Shelter.objects.all()

    if q:
        shelters = shelters.filter(
            Q(name__icontains=q) |
            Q(city__icontains=q) |
            Q(description__icontains=q)
        )

    if country:
        shelters = shelters.filter(country=country)

    if org_type:
        shelters = shelters.filter(org_type=org_type)

    shelters = shelters.order_by("name")

    return render(request, "shelters/shelter_list.html", {
        "shelters": shelters,
        "q": q,
        "country": country,
        "org_type": org_type,
    })
