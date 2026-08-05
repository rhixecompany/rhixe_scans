from __future__ import annotations

from typing import Any

from pydantic import BaseModel, Field


class Links(BaseModel):
    mu: str
    raw: str


class MdCover(BaseModel):
    vol: str
    w: int
    h: int
    b2key: str


class Relates(BaseModel):
    title: str
    slug: str
    hid: str
    md_covers: list[MdCover]


class Recommendation(BaseModel):
    up: int
    down: int
    total: int
    relates: Relates


class MdTitle(BaseModel):
    title: str
    lang: str


class MdGenres(BaseModel):
    name: str
    type: str | None
    slug: str
    group: str


class MdComicMdGenre(BaseModel):
    md_genres: MdGenres


class MdCover1(BaseModel):
    vol: Any
    w: int
    h: int
    b2key: str


class MuPublishers(BaseModel):
    title: str
    slug: str


class MuComicPublisher(BaseModel):
    mu_publishers: MuPublishers


class MuCategories(BaseModel):
    title: str
    slug: str


class MuComicCategory(BaseModel):
    mu_categories: MuCategories
    positive_vote: int
    negative_vote: int


class MuComics(BaseModel):
    mu_comic_publishers: list[MuComicPublisher]
    licensed_in_english: Any
    mu_comic_categories: list[MuComicCategory]


class Comic(BaseModel):
    id: int
    hid: str
    title: str
    country: str
    status: int
    links: Links
    last_chapter: str
    chapter_count: int
    demographic: Any
    user_follow_count: int
    follow_rank: int
    follow_count: int
    desc: str
    parsed: str
    slug: str
    mismatch: Any
    year: int
    bayesian_rating: str
    rating_count: int
    content_rating: str
    translation_completed: bool
    chapter_numbers_reset_on_new_volume_manual: bool
    final_chapter: Any
    final_volume: Any
    noindex: bool
    adsense: bool
    login_required: bool
    recommendations: list[Recommendation]
    relate_from: list
    is_english_title: Any
    md_titles: list[MdTitle]
    md_comic_md_genres: list[MdComicMdGenre]
    md_covers: list[MdCover1]
    mu_comics: MuComics
    iso639_1: str
    lang_name: str
    lang_native: str


class MdGroups(BaseModel):
    title: str
    slug: str


class MdChaptersGroup(BaseModel):
    md_groups: MdGroups


class FirstChapter(BaseModel):
    vol: Any
    title: Any
    chap: str
    hid: str
    lang: str
    created_at: str
    up_count: int
    group_name: list[str]
    md_chapters_groups: list[MdChaptersGroup]


class Artist(BaseModel):
    name: str
    slug: str


class Author(BaseModel):
    name: str
    slug: str


class Model(BaseModel):
    comic: Comic | None = None
    first_chapters: list[FirstChapter] | None = Field(
        None,
        alias="firstChapters",
    )
    artists: list[Artist] | None = None
    authors: list[Author] | None = None
    lang_list: list[str] | None = Field(None, alias="langList")
    recommendable: bool | None = None
    demographic: Any | None = None
    english_link: Any | None = Field(None, alias="englishLink")
    mature_content: bool | None = Field(None, alias="matureContent")
    selector_position: str | None = None
    check_vol2_chap1: bool | None = Field(
        None,
        alias="checkVol2Chap1",
    )
