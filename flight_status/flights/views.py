
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Flight
from pymongo import MongoClient
from django.conf import settings
import requests

client = MongoClient(settings.MONGO_URI)
db = client.get_database('flight_status_db')
subscriptions_collection = db['subscriptions']


@api_view(['GET'])
def get_flight_status(request, flight_id):
    try:
        flight = Flight.objects.get(flight_id=flight_id)
        data = {
            "flight_id": flight.flight_id,
            "status": flight.status,
            "gate": flight.gate,
            "delay": flight.delay
        }
        return Response(data)
    except Flight.DoesNotExist:
        return Response({"error": "Flight not found"}, status=404)


@api_view(['POST'])
def subscribe(request):
    data = request.data
    email = data.get('email')
    flight_id = data.get('flight_id')

    if not email or not flight_id:
        return Response({"error": "Email and Flight ID are required"}, status=400)

    subscription = {"email": email, "flight_id": flight_id}
    subscriptions_collection.insert_one(subscription)

    return Response({"message": "Subscription successful!"}, status=201)
