from rest_framework import serializers
from api.models import Symptom, Diagnosis


class DiagnosisSerializer(serializers.ModelSerializer):

		class Meta:
				model = Diagnosis
				fields = ('id', 'name', 'count')


class SymptomSerializer(serializers.ModelSerializer):
		diagnoses = DiagnosisSerializer(many=True, read_only=True)

		class Meta:
				model = Symptom
				fields = ('id', 'name', 'diagnoses')
