"""
This module includes functions to process request headers.
Refer to the PLAYWRIGHT_PROCESS_REQUEST_HEADERS setting for more information.
"""

from typing import Dict  # noqa: UP035
from urllib.parse import urlparse

from playwright.async_api import Request as PlaywrightRequest


async def use_scrapy_headers(
    *,
    browser_type_name: str,
    playwright_request: PlaywrightRequest,
    scrapy_request_data: dict,
) -> Dict[str, str]:  # noqa: UP006
    """Scrapy headers take precedence over Playwright headers for navigation requests.
    For non-navigation requests, only User-Agent is taken from the Scrapy headers."""

    scrapy_headers_str = scrapy_request_data["headers"].to_unicode_dict()
    playwright_headers = await playwright_request.all_headers()

    # Scrapy's user agent has priority over Playwright's
    scrapy_headers_str.setdefault("user-agent", playwright_headers.get("user-agent"))

    if playwright_request.is_navigation_request():
        # if referer header is set via playwright_page_goto_kwargs
        if referer := playwright_headers.get("referer"):
            scrapy_headers_str.setdefault("referer", referer)

        # otherwise it fails with playwright.helper.Error: NS_ERROR_NET_RESET
        if browser_type_name == "firefox":
            scrapy_headers_str["host"] = urlparse(playwright_request.url).netloc

        return scrapy_headers_str

    # override user agent, for consistency with other requests
    if scrapy_headers_str.get("user-agent"):
        playwright_headers["user-agent"] = scrapy_headers_str["user-agent"]
    return playwright_headers
