from django.conf.urls import include, url
from rest_framework import routers
from api import views as api_views


router = routers.DefaultRouter()
router.register(r'symptoms', api_views.SymptomViewSet)
router.register(r'diagnoses', api_views.DiagnosisViewSet)

urlpatterns = [
    url(r'^', include(router.urls)),
]