from api.models import Symptom, Diagnosis
from api.serializers import SymptomSerializer, DiagnosisSerializer

from rest_framework import viewsets


# REST routes for the Symptom Class
class SymptomViewSet(viewsets.ModelViewSet):
		queryset = Symptom.objects.all()
		serializer_class = SymptomSerializer


# REST routes for the Diagnosis class
class DiagnosisViewSet(viewsets.ModelViewSet):
		queryset = Diagnosis.objects.all()
		serializer_class = DiagnosisSerializer
