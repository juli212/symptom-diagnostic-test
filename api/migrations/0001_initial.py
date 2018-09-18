# -*- coding: utf-8 -*-
# Generated by Django 1.11.15 on 2018-09-18 14:41
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Diagnosis',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Frequency',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('diagnosis', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='frequency', to='api.Diagnosis')),
            ],
        ),
        migrations.CreateModel(
            name='Sympton',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200, unique=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.AddField(
            model_name='frequency',
            name='symptom',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='frequency', to='api.Sympton'),
        ),
        migrations.AddField(
            model_name='diagnosis',
            name='symptom',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='diagnoses', to='api.Sympton'),
        ),
    ]
