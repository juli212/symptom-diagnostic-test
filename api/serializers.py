from rest_framework import serializers
from api.models import Symptom, Diagnosis


# returns a Diagnosis object or a collection of objects
# count field is the frequency the object has been selected as the correct diagnosis for its associated Symptom
class DiagnosisSerializer(serializers.ModelSerializer):

		class Meta:
				model = Diagnosis
				fields = ('id', 'name', 'count')


# returns a Symptom object or a collection of objects with nested Diagnoses objects belonging to each Symptom
class SymptomSerializer(serializers.ModelSerializer):
		diagnoses = DiagnosisSerializer(many=True, read_only=True)

		class Meta:
				model = Symptom
				fields = ('id', 'name', 'diagnoses')
