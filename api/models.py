from __future__ import unicode_literals

from django.db import models


class Symptom(models.Model):
		name = models.CharField(max_length=200, unique=True)
		updated_at = models.DateTimeField(auto_now=True)
		created_at = models.DateTimeField(auto_now_add=True)

		def __str__(self):
				return self.name


class Diagnosis(models.Model):
		name = models.CharField(max_length=200)
		symptom = models.ForeignKey(Symptom, on_delete=models.CASCADE, related_name='diagnoses')
		count = models.IntegerField(default=0)
		updated_at = models.DateTimeField(auto_now=True)
		created_at = models.DateTimeField(auto_now_add=True)

		def __str__(self):
				return self.name
