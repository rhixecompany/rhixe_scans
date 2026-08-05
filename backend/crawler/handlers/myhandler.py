from scrapy.core.downloader.handlers.http import HTTPDownloadHandler


class MyCustomHTTPHandler(HTTPDownloadHandler):
    def download_request(self, request, spider):
        request.headers.setdefault(b"Authorization", b"Bearer mysecrettoken")
        spider.logger.info(f"Processing request: {request}")
        response = super().download_request(request, spider)
        if b"Error" in response.body:  # type: ignore
            spider.logger.warning(f"Error found in response: {response}")
        return response
