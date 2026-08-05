from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, generics
from rest_framework.permissions import AllowAny, IsAdminUser

from api.libary.models import Artist
from api.libary.pagination import StandardResultsSetPagination
from api.libary.serializers import ArtistSerializer


class ArtistListAPIView(generics.ListCreateAPIView):
    queryset = Artist.objects.prefetch_related(
        "artistcomics",
    ).all()
    serializer_class = ArtistSerializer
    filter_backends = [
        DjangoFilterBackend,  # type: ignore
        filters.SearchFilter,
        filters.OrderingFilter,
    ]
    pagination_class = StandardResultsSetPagination

    def get_queryset(self):
        return super().get_queryset()

    def get_permissions(self):
        self.permission_classes = [AllowAny]
        if self.request.method == "POST":
            self.permission_classes = [IsAdminUser]
        return super().get_permissions()


artist_list = ArtistListAPIView.as_view()


class ArtistDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Artist.objects.prefetch_related(
        "artistcomics",
    ).all()
    serializer_class = ArtistSerializer
    lookup_url_kwarg = "id"

    def get_permissions(self):
        self.permission_classes = [AllowAny]
        if self.request.method in ["PUT", "PATCH", "DELETE"]:
            self.permission_classes = [IsAdminUser]
        return super().get_permissions()


artist_detail = ArtistDetailAPIView.as_view()
