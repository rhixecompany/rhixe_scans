from datetime import timedelta
from pprint import pprint

from django.utils.timezone import now

from api.libary.models import Comic


def run():
    week = now() - timedelta(weeks=1)
    month = now() - timedelta(weeks=4)
    comics = Comic.objects.all()
    weekcomics = Comic.objects.get_updated_at(week)  # type: ignore  # noqa: PGH003
    monthcomics = Comic.objects.get_updated_at(month)  # type: ignore  # noqa: PGH003
    context = {
        "monthlycomics": monthcomics[0].title,
        "monthlycomics_count": monthcomics.count(),
        "weeklycomics": weekcomics[0].title,
        "weeklycomics_count": weekcomics.count(),
        "allcomics": comics[0].title,
        "allcomics_count": comics.count(),
    }
    pprint(context)  # noqa: T203
