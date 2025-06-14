import random

from crawler.settings import USER_AGENT_LIST


class RotateUserAgentMiddleware:
    def process_request(self, request, spider):
        user_agent = random.choice(USER_AGENT_LIST)  # noqa: S311
        request.headers["User-Agent"] = user_agent
