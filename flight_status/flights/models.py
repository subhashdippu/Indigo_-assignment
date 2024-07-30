
from django.db import models


class Flight(models.Model):
    flight_id = models.CharField(max_length=10, primary_key=True)
    status = models.CharField(max_length=50)
    gate = models.CharField(max_length=10)
    delay = models.CharField(max_length=50)
    updated_at = models.DateTimeField(auto_now=True)
