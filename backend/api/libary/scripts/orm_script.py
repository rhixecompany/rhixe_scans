import random
from pprint import pprint

from django.db import connection
from django.db.models import Count
from django.db.models import F
from django.db.models import Q

from api.libary.constants import ComicStatus
from api.libary.models import Chapter
from api.libary.models import Comic


def run():
    # get all Ongoing and Completed comics
    og = ComicStatus.ONGOING
    cp = ComicStatus.COMPLETED

    pprint(
        Comic.objects.filter(Q(status=og) | Q(status=cp)).values("rating"),
    )

    pprint(connection.queries)  # noqa: T203
