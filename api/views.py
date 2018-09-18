# -*- coding: utf-8 -*-
from api.models import Symptom, Diagnosis
from api.serializers import SymptomSerializer, DiagnosisSerializer

from rest_framework import viewsets


class SymptomViewSet(viewsets.ModelViewSet):
		queryset = Symptom.objects.all()
		serializer_class = SymptomSerializer


class DiagnosisViewSet(viewsets.ModelViewSet):
		queryset = Diagnosis.objects.all()
		serializer_class = DiagnosisSerializer
