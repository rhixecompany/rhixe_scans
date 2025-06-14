import random
from pprint import pprint

from django.db import connection
from django.db.models import Count
from django.db.models import F
from django.db.models import Q

from api.libary.models import Chapter
from api.libary.models import Comic


def run():
    # get all Ongoing and Completed comics
    og = Comic.ComicStatus.ONGOING
    cp = Comic.ComicStatus.COMPLETED

    pprint(Comic.objects.filter(Q(status=og) | Q(status=cp)))  # noqa: T203

    pprint(connection.queries)  # noqa: T203
