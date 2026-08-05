import json
import logging

from api.libary.models import (
    Artist,  # noqa: F401
    Author,  # noqa: F401
    Category,  # noqa: F401
    Chapter,
    ChapterImage,  # noqa: F401
    Comic,  # noqa: F401
    ComicImage,  # noqa: F401
    Genre,  # noqa: F401
)
from django.conf import settings
from django.contrib.auth import get_user_model  # noqa: F401
from django.core.management.base import BaseCommand
from django.db.models import Q  # noqa: F401

logger = logging.getLogger(__name__)


class Command(BaseCommand):
    help = "Generates comics for apps"

    def handle(self, *args, **options):
        def save_chapters(chapters_data):
            for item in chapters_data:
                images = item.get("images")
                comicslug = item["comicslug"]  # noqa: F841
                comictitle = item["comictitle"]
                name = item["chaptername"]
                slug = item["chapterslug"]
                link = item["url"]  # noqa: F841
                spider = item["spider"]  # noqa: F841
                updated_at = item.get("updated_at")  # noqa: F841
                numimages = len(images)  # noqa: F841
                if comictitle == "The Indomitable Martial King" or comictitle.lower() == "The Indomitable Martial King":
                    chapter = Chapter.objects.get_search(  # type: ignore
                        slug,
                    )
                    if chapter.exists():
                        msg3 = f"{chapter.first().chapter_id} - {chapter.first().slug} - {chapter.first().comic.title} Exists"  # type: ignore
                        logger.error(
                            msg3,
                        )
                    else:
                        logger.info(name)

        base = settings.BASE_DIR
        # comics_file = str(base / "comics.json")
        # with open(comics_file, encoding="utf-8") as comic_file:  # noqa: E501, PTH123, RUF100
        #     comics_data = json.load(comic_file)
        #     save_comics(comics_data=comics_data)
        chapters_file = str(base / "chapters.json")
        with open(chapters_file, encoding="utf-8") as chapter_file:
            chapters_data = json.load(chapter_file)
            save_chapters(chapters_data=chapters_data)
